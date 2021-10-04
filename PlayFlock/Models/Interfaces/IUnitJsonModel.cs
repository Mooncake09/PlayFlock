using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayFlock
{
    interface IUnitModel
    {
        public string Id { get; set; }
        public int MaxHP { get; set; }
        public int HP { get; set; }
        public int MaxMana { get; set; }
        public int Mana { get; set; }
        public int Armor { get; set; }
        public int MagicResistance { get; set; }
        public string UnitClass { get; }
        public int X { get; set; }
        public int Y { get; set; }
        public int BaseDamage { get; set; }
        public bool IsAlive { get; set; }
    }
}
