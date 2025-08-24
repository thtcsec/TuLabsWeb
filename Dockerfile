# ---------- Build ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish TuLabsWeb.csproj -c Release -o /app /p:UseAppHost=false

# ---------- Runtime ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Render sẽ đặt biến PORT; ép Kestrel lắng nghe vào đó
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}
# nếu bạn muốn log timezone, culture... thì set thêm ENV zô đây

COPY --from=build /app ./
EXPOSE 10000    # chỉ để tài liệu; Render sẽ map $PORT -> container

ENTRYPOINT ["dotnet", "TuLabsWeb.dll"]
