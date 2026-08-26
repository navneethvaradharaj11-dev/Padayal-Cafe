import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Target, Eye, Users, Award } from 'lucide-react';

const VALUES = [
  {
    icon: Heart,
    title: 'Health First',
    description: 'We prioritize your well-being in every dish we create, using cooking methods that preserve nutrients.',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Only the finest, freshest, and most natural ingredients make it to your plate.',
  },
  {
    icon: Target,
    title: 'No Compromise',
    description: 'We never compromise on quality or health for convenience or cost.',
  },
];

const TIMELINE = [
  {
    year: '2015',
    title: 'The Seed is Planted',
    description: 'Our founder, Chef Murugan, began experimenting with oil-free cooking after his father\'s heart condition required a dietary change.',
  },
  {
    year: '2017',
    title: 'Recipe Development',
    description: 'After two years of perfecting recipes, we developed over 50 dishes that taste delicious without a drop of oil.',
  },
  {
    year: '2019',
    title: 'Padayal Opens',
    description: 'We opened our doors in Chennai, introducing the world to the concept of No Oil No Boil cooking.',
  },
  {
    year: '2021',
    title: 'Recognition',
    description: 'Padayal receives the "Healthiest Restaurant" award from the Tamil Nadu Health Association.',
  },
  {
    year: '2024',
    title: 'Growing Family',
    description: 'Over 50,000 guests have experienced our unique dining, and the Padayal family continues to grow.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-forest-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="heading-xl text-white mb-4">Our Story</h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            A journey of passion, health, and the revolutionary concept of
            cooking without oil.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
                Our Founder
              </span>
              <h2 className="heading-lg text-earth-800 mb-6">
                Chef Murugan Subramanian
              </h2>
              <p className="text-body-lg mb-4">
                A culinary artist with over 25 years of experience, Chef
                Murugan discovered the transformative power of oil-free cooking
                when his father was diagnosed with severe heart disease in
                2014.
              </p>
              <p className="text-body-lg mb-4">
                "Doctors said my father needed to change his diet drastically.
                As a chef, I took it as a challenge—could I create food that was
                both healthy and delicious? After countless experiments, I
                discovered that the secret wasn't in adding things, but in
                taking away—removing oil and letting natural flavors shine."
              </p>
              <p className="text-body-lg mb-6">
                Today, Chef Murugan's father is healthier than ever, and
                Padayal has helped thousands of people discover that healthy
                food can be the most delicious food of all.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-forest-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-forest-700" />
                </div>
                <div>
                  <p className="font-semibold text-earth-800">Award-Winning Chef</p>
                  <p className="text-sm text-earth-500">Tamil Nadu Culinary Excellence Award</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-earth-900/20">
                <img
                  src="https://images.pexels.com/photos/1438636/pexels-photo-1438636.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Chef Murugan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 max-w-xs bg-forest-800 rounded-xl p-4 text-white shadow-xl">
                <p className="text-3xl font-bold font-display">25+</p>
                <p className="text-forest-200">Years of Culinary Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-14 h-14 rounded-xl bg-forest-700 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="heading-md text-earth-800 mb-4">Our Mission</h3>
              <p className="text-body-lg">
                To revolutionize healthy eating by proving that nutritious food
                can be delicious, satisfying, and accessible to everyone. We
                believe that every meal should nourish both body and soul.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-14 h-14 rounded-xl bg-earth-700 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="heading-md text-earth-800 mb-4">Our Vision</h3>
              <p className="text-body-lg">
                A world where healthy eating is the norm, not the exception.
                Where restaurants everywhere adopt cooking methods that
                prioritize health without sacrificing taste. We aim to lead
                this revolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="heading-lg text-earth-800 mb-4">What We Stand For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((value, index) => (
              <div
                key={value.title}
                className="card p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-forest-100 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-forest-700" />
                </div>
                <h3 className="heading-sm text-earth-800 mb-3">{value.title}</h3>
                <p className="text-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="heading-lg text-earth-800 mb-4">The Padayal Story</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-forest-200" />

              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  <div className="absolute left-4 w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {item.year.slice(2)}
                    </span>
                  </div>
                  <div className="card-static p-6">
                    <span className="text-forest-600 font-bold text-lg">
                      {item.year}
                    </span>
                    <h3 className="font-semibold text-earth-800 mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-body text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="heading-lg text-earth-800 mb-4">
              The People Behind Padayal
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Our passionate team of chefs, nutritionists, and service staff
              work together to bring you the best healthy dining experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Murugan S.', role: 'Executive Chef', image: 'https://images.pexels.com/photos/1438636/pexels-photo-1438636.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Lakshmi K.', role: 'Head Nutritionist', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Aravind P.', role: 'Sous Chef', image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Priya M.', role: 'Guest Relations', image: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=400' },
            ].map((person) => (
              <div key={person.name} className="card overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-earth-800">{person.name}</h3>
                  <p className="text-sm text-earth-500">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthy Food Concept */}
      <section className="section-padding bg-forest-800 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">The Healthy Food Concept</h2>
              <p className="text-cream-200 text-lg mb-6">
                Our "No Oil No Boil" philosophy is rooted in scientific
                principles that have been known for centuries but often
                overlooked in modern cooking.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-forest-600 flex items-center justify-center shrink-0 mt-1">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Steam Cooking</h4>
                    <p className="text-cream-300 text-sm">
                      Preserves up to 90% of nutrients compared to 50% in
                      boiling or less in frying.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-forest-600 flex items-center justify-center shrink-0 mt-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Pressure Cooking</h4>
                    <p className="text-cream-300 text-sm">
                      Retains water-soluble vitamins while reducing cooking
                      time and energy use.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-forest-600 flex items-center justify-center shrink-0 mt-1">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Natural Roasting</h4>
                    <p className="text-cream-300 text-sm">
                      Enhances flavors through natural caramelization without
                      added fats.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/wellness"
                className="btn-primary mt-8 inline-flex bg-white text-forest-800 hover:bg-cream-100"
              >
                Learn More in Wellness Hub
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Healthy cooking"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
