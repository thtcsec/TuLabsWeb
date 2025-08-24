using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace TuLabsWeb.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        [BindProperty]
        [Required(ErrorMessage = "Tên không được để trống.")]
        public string Name { get; set; }

        [BindProperty]
        [Required(ErrorMessage = "Email không được để trống.")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
        public string Email { get; set; }

        [BindProperty(SupportsGet = true)]
        [Required(ErrorMessage = "Loại dự án không được để trống.")]
        public string ProjectType { get; set; }

        

        [BindProperty]
        [Required(ErrorMessage = "Mô tả chi tiết không được để trống.")]
        [MinLength(20, ErrorMessage = "Mô tả phải có ít nhất 20 ký tự.")]
        public string Description { get; set; }

        [BindProperty]
        public bool OpenSource { get; set; }

        [BindProperty]
        [Range(typeof(bool), "true", "true", ErrorMessage = "Bạn phải đồng ý với chính sách bảo mật.")]
        public bool Privacy { get; set; }

        public void OnGet()
        {

        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Form submission failed due to validation errors.");
                return Page(); // Return the same page with validation errors
            }

            // Here you would typically send the email or save to a database
            _logger.LogInformation("Form submitted successfully: Name={Name}, Email={Email}, ProjectType={ProjectType}", Name, Email, ProjectType);

            // For now, just redirect to a success page or show a success message
            TempData["SuccessMessage"] = "Yêu cầu của bạn đã được gửi thành công!";
            return RedirectToPage("/Index");
        }
    }
}
