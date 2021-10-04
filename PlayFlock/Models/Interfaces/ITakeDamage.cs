using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayFlock
{
    public interface ITakeDamage
    {
        public int X { get; set; }
        public int Y { get; set; }
        public void TakeDamage(Damage damage);
        public double GetDistance(ITakeDamage u);
    }
}
