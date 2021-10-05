using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PlayFlock.Models
{
    [BsonDiscriminator(Required = true)]
    [BsonKnownTypes(typeof(WarriorUnit), typeof(ArcherUnit), typeof(WizardUnit))]
    public abstract class Unit : ITakeDamage, IUnitModel
    {
        [JsonConstructor]
        public Unit()
        {
        
        }
        public enum ClassList
        {
            Warrior,
            Archer,
            Wizard
        }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int MaxHP { get; set; }
        public int HP { get; set; }
        public int MaxMana { get; set; }
        public int Mana { get; set; }
        public int Armor { get; set; }
        public int MagicResistance { get; set; }
        //[BsonRepresentation(BsonType.String)]
        //public ClassList UnitClass { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string UnitClass { 
            get
            {
                var name = GetType().Name;
                return name.Replace("Unit", "");
            }
            //private set { UnitClass = value; }
        }
        public int X { get; set; }
        public int Y { get; set; }
        public bool IsAlive { get; set; } = true;
        public double GetDistance(ITakeDamage p)
        {
            return Math.Sqrt(Math.Pow(p.X - X, 2) + Math.Pow(p.Y - Y, 2));
        }
        public virtual void TakeDamage(Damage damage)
        {
            if(IsAlive)
            {
                switch (damage.DamageTypeValue)
                {
                    case Damage.DamageType.Physical:
                        HP -= Math.Abs(Armor - (int)Math.Floor(damage.Value));
                        break;
                    case Damage.DamageType.Magic:
                        HP -= Math.Abs(MagicResistance - (int)Math.Floor(damage.Value));
                        break;
                }
                if (HP <= 0) IsAlive = false;
            }
        }
    }
}
