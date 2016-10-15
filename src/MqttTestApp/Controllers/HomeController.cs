using Microsoft.AspNetCore.Mvc;

namespace UsonLeakTestApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
