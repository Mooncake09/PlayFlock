using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayFlock.Models
{
    public class ArcherUnit : Unit, IAttack
    {
        public int MaxAttackRange { get; private set; } = 350;
        public int BaseDamage { get; set; } = new Random().Next(1, 20);
        public void Attack(ITakeDamage unit)
        {
            if (IsAlive)
            {
                if (GetDistance(unit) <= MaxAttackRange)
                {
                    double damageValue = BaseDamage + GetDistance(unit) / MaxAttackRange * BaseDamage;
                    unit.TakeDamage(new Damage(damageValue, Damage.DamageType.Physical));
                }
            }
        }
    }
}
