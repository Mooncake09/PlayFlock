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
    public abstract class Unit
    {
        [Newtonsoft.Json.JsonConstructor]
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
        public int maxHP { get; set; }
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
        public int MaxAttackRange { get; set; }
        public int BaseDamage { get; set; }
        public abstract void TakeDamage(Unit u);
        public double GetDistance(Unit p)
        {
            return Math.Sqrt(Math.Pow(p.X - X, 2) + Math.Pow(p.Y - Y, 2));
        }
    }
}
