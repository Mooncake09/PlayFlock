using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayFlock.Models
{
    class UnitJsonModel : IUnitModel
    {
        public string Id { get; set; }
        public int MaxHP { get; set; }
        public int HP { get; set; }
        public int MaxMana { get; set; }
        public int Mana { get; set; }
        public int Armor { get; set; }
        public int MagicResistance { get; set; }
        public string UnitClass { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int BaseDamage { get; set; }
        public bool IsAlive { get; set; } = true;
        public Unit GetUnitInstance()
        {
            Unit unit = null;
            switch(UnitClass)
            {
                case "Warrior":
                    unit = new WarriorUnit() { HP = HP, MaxHP = MaxHP, Mana = Mana, MaxMana = MaxMana, Armor = Armor, BaseDamage = BaseDamage, MagicResistance = MagicResistance, X = X, Y = Y }; 
                    break;
                case "Archer":
                    unit = new ArcherUnit() { HP = HP, MaxHP = MaxHP, Mana = Mana, MaxMana = MaxMana, Armor = Armor, BaseDamage = BaseDamage, MagicResistance = MagicResistance, X = X, Y = Y };
                    break;
                case "Wizard":
                    unit = new WizardUnit() { HP = HP, MaxHP = MaxHP, Mana = Mana, MaxMana = MaxMana, Armor = Armor, BaseDamage = BaseDamage, MagicResistance = MagicResistance, X = X, Y = Y };
                    break;
            }
            return unit;
        }
    }
}
