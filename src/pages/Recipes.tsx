import { motion } from "framer-motion";
import { Clock, Users, ChefHat } from "lucide-react";

const recipes = [

    {
        id: 2,
        title: "Persian Saffron Tea",
        description: "A soothing and aromatic tea that warms the soul. Perfect for relaxation and enjoying the pure essence of saffron.",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
        ingredients: [
            "1 pinch Saffron threads",
            "2 Cardamom pods",
            "1 tbsp Rose water",
            "Honey to taste",
            "Hot water",
        ],
        time: "10 mins",
        servings: "2",
    },
    {
        id: 3,
        title: "Saffron Chicken Paella",
        description: "A vibrant Spanish rice dish loaded with flavors. The saffron gives the rice its signature yellow color and unique taste.",
        image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800",
        ingredients: [
            "2 cups Paella rice",
            "1 tsp Saffron threads",
            "500g Chicken thighs",
            "1 cup Peas",
            "Bell peppers",
        ],
        time: "60 mins",
        servings: "6",
    },
    {
        id: 4,
        title: "Golden Saffron Milk Cake",
        description: "A decadent dessert soaked in saffron-infused milk. Light, spongy, and absolutely divine.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
        ingredients: [
            "2 cups Flour",
            "1 cup Sugar",
            "1 tsp Saffron milk",
            "1/2 cup Butter",
            "Pistachios for garnish",
        ],
        time: "50 mins",
        servings: "8",
    },

];

export default function Recipes() {
    return (
        <main className="pt-28 pb-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Culinary</p>
                    <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
                        Saffron <span className="italic">Recipes</span>
                    </h1>
                    <p className="mt-4 text-muted-foreground font-body max-w-2xl mx-auto">
                        Discover the versatility of saffron with our curated collection of delicious recipes.
                        From savory classics to sweet indulgences, elevate your cooking with the golden spice.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe, index) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="p-6">
                                <h3 className="font-display text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {recipe.title}
                                </h3>
                                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4 line-clamp-2">
                                    {recipe.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs font-body text-muted-foreground mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        <span>{recipe.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users size={14} />
                                        <span>{recipe.servings} Servings</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <ChefHat size={14} />
                                        <span>{recipe.ingredients.length} Ingredients</span>
                                    </div>
                                </div>

                                <div className="border-t border-border pt-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider mb-2">Key Ingredients:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                                            <span key={i} className="text-[10px] bg-secondary px-2 py-1 rounded text-foreground/80">
                                                {ingredient}
                                            </span>
                                        ))}
                                        {recipe.ingredients.length > 3 && (
                                            <span className="text-[10px] bg-secondary px-2 py-1 rounded text-foreground/80">
                                                +{recipe.ingredients.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
