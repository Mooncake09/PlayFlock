using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayFlock
{
    public class Damage
    {
        public Damage(double value, DamageType damageType)
        {
            if (value <= 0)
            {
                Value = 0;
            }
            else
            {
                Value = value;
            }
            DamageTypeValue = damageType;
        }
        public enum DamageType
        {
            Physical,
            Magic
        }
        public double Value { get; set; }
        public DamageType DamageTypeValue { get; set; }
    }
}
