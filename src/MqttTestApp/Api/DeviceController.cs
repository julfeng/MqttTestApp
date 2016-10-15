using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Dynamic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UsonLeakTestApp.Api
{
    [Route("api/[controller]")]
    public class DeviceController : Controller
    {
        // GET: api/values
        [HttpGet]
        public JsonResult Get()
        {
            //string allText = System.IO.File.ReadAllText(@"C:\Development\Contracts\Creation\Uson\v1\UsonLeakTestApp\src\UsonLeakTestApp\Api\test.json");
            List<dynamic> devices = new List<dynamic>();
            devices.Add(new { DeviceId = "DashDemoUnit", SerialNumber = "12345" });
            

            //object jsonObject = JsonConvert.DeserializeObject(allText);
            return Json(devices);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
