using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayFlock.Models
{
    public class WizardUnit : Unit, IAttack
    {
        public int MaxAttackRange { get; private set; } = 150;
        public void Attack(ITakeDamage unit)
        {
            if (IsAlive)
            {
                if (GetDistance(unit) <= MaxAttackRange)
                {
                    double damageValue;
                    if (Mana > 0)
                    {
                        damageValue = BaseDamage * 2;
                        Mana /= 2;
                        if (Mana < 1) Mana = 1;
                    }
                    else
                    {
                        damageValue = Math.Floor((double)BaseDamage / 2);
                    }
                    var damage = new Damage(damageValue, Damage.DamageType.Magic);
                    unit.TakeDamage(damage);
                }
            }
        }
    }
}
