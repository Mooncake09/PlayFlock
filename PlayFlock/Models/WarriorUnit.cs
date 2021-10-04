using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayFlock.Models
{
    public class WarriorUnit : Unit, IAttack
    {
        public int MaxAttackRange { get; private set; } = 10;
        public void Attack(ITakeDamage unit)
        {
            if (IsAlive)
            {
                if (GetDistance(unit) <= MaxAttackRange)
                {
                    double damageValue = BaseDamage + (MaxHP - HP) / MaxHP * BaseDamage;
                    unit.TakeDamage(new Damage(damageValue, Damage.DamageType.Physical));
                }
            }

        }
    }
}
