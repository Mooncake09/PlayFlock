using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayFlock
{
    public interface IAttack
    {
        public int BaseDamage { get; set; }
        public int MaxAttackRange { get; }
        public void Attack(ITakeDamage unit);
    }
}
