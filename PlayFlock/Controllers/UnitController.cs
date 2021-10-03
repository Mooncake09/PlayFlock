using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Json;
using PlayFlock.Models;

namespace PlayFlock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UnitController : Controller
    {
        private readonly UnitService db;
        public UnitController(UnitService context)
        {
            db = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/unit/list")]
        public async Task<IEnumerable<Unit>> GetUnits()
        {
            return await db.GetUnitList();
        }
        [Route("unit/create")]
        [HttpGet]
        public IActionResult ShowCreateForm()
        {
            return View("Create");
        }

        [Route("api/unit/create")]
        [HttpPost]
        public async Task<RedirectResult> AddNewUnit([FromBody]object jsonObject)
        {
            Unit unit;
            var jsonString = jsonObject.ToString();
     
            if (jsonString.Contains("Warrior"))
            {
                unit = JsonConvert.DeserializeObject<WarriorUnit>(jsonString);
            }
            else if (jsonString.Contains("Archer"))
            {
                unit = JsonConvert.DeserializeObject<ArcherUnit>(jsonString);
            }
            else if (jsonString.Contains("Wizard"))
            {
                unit = JsonConvert.DeserializeObject<WizardUnit>(jsonString);
            }
            else
            {
                unit = null;
            }
            
            if (unit != null)
            {
                 await db.AddUnitToDB(unit);
            }
            return RedirectPermanent("~/list");
        }
    }
}
