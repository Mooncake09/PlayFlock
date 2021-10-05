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
        public async Task AddNewUnit([FromBody]object jsonObject)
        {
            
            var jsonString = jsonObject.ToString();
            var unitJsonModel = JsonConvert.DeserializeObject<UnitJsonModel>(jsonString);
            var unit = unitJsonModel.GetUnitInstance();
            
            if (unit != null)
            {
                 await db.AddUnitToDB(unit);
            }
        }

        [HttpGet]
        [Route("api/unit/edit/{id}")]
        public async Task<Unit> GetSingleUser(string id)
        {
            return await db.GetUnit(id);
        }

        [HttpPut]
        [Route("api/unit/edit/{id}")]
        public async Task UpdateUnit([FromBody]object jsonObject, string id)
        {
            var jsonString = jsonObject.ToString();
            var unitJsonModel = JsonConvert.DeserializeObject<UnitJsonModel>(jsonString);
            var unit = unitJsonModel.GetUnitInstance();
            unit.Id = id;
            await db.UpdateUnitInfo(unit);
        }
        [HttpDelete]
        [Route("api/unit/remove/{id}")]
        public async Task DeleteUnit(string id)
        {
            await db.RemoveUnitFromDB(id);
        }
        [HttpPost]
        [Route("api/unit/attack")]
        public async Task Attack([FromBody]object jsonObject)
        {
            var json = JContainer.FromObject(jsonObject);
            string firstId = json.First.First.ToString();
            string secondId = json.Last.Last.ToString();
            IAttack attackingUnit = await db.GetUnit(firstId) as IAttack;
            Unit defendingUnit = await db.GetUnit(secondId);
            attackingUnit.Attack(defendingUnit);
            await db.UpdateUnitInfo(defendingUnit);
        }
    }
}
