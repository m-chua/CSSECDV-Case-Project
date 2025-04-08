const PLACEHOLDER_IMAGE = 'uploads/media/dummy-image.jpg'

const restaurants = [
    {
        name: 'Pasta Paradise',
        cuisine: 'Italian',
        averageRating: 4.5,
        averageCost: 20,
        media: PLACEHOLDER_IMAGE,
        description: 'The best pasta dishes in town.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',  

        amenities: [1, 2],
        username: 'pastaLover',
        password: 'securePassword1'
        
    },
    {
        name: 'Sushi Central',
        cuisine: 'Japanese',
        averageRating: 4.7,
        averageCost: 25,
        media: PLACEHOLDER_IMAGE,
        description: 'Fresh sushi made daily.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
 
        
        amenities: [1, 3],
        username: 'sushiFan',
        password: 'securePassword2'
    },
    {
        name: 'Burger Bliss',
        cuisine: 'American',
        averageRating: 4.3,
        averageCost: 15,
        media: PLACEHOLDER_IMAGE,
        description: 'Juicy burgers with a variety of toppings.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
 
        
        amenities: [2, 4],
        username: 'burgerGuy',
        password: 'securePassword3'
    },
    {
        name: 'Taco Town',
        cuisine: 'Mexican',
        averageRating: 4.6,
        averageCost: 12,
        media: PLACEHOLDER_IMAGE,
        description: 'Authentic Mexican tacos and burritos.',
        
        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
 
        
        amenities: [1, 3],
        username: 'tacoMaster',
        password: 'securePassword4'
    },
    {
        name: 'Curry Kingdom',
        cuisine: 'Indian',
        averageRating: 4.8,
        averageCost: 18,
        media: PLACEHOLDER_IMAGE,
        description: 'Spicy curries and flavorful dishes.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
 
        
        amenities: [2, 5],
        username: 'curryQueen',
        password: 'securePassword5'
    },
    {
        name: 'Choco Delight',
        cuisine: 'Dessert',
        averageRating: 4.9,
        averageCost: 8,
        media: PLACEHOLDER_IMAGE,
        description: 'Heavenly desserts and chocolates.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
     
        amenities: [1],
        username: 'dessertLover',
        password: 'securePassword6'
    },
    {
        name: 'Grill Masters',
        cuisine: 'BBQ',
        averageRating: 4.4,
        averageCost: 22,
        media: PLACEHOLDER_IMAGE,
        description: 'Grilled meats and BBQ specialties.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
     
        amenities: [2, 3],
        username: 'grillKing',
        password: 'securePassword7'
    },
    {
        name: 'Veggie Delight',
        cuisine: 'Vegetarian',
        averageRating: 4.2,
        averageCost: 10,
        media: PLACEHOLDER_IMAGE,
        description: 'Tasty vegetarian dishes for everyone.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
     
        amenities: [1, 4],
        username: 'veggieLover',
        password: 'securePassword8'
    },
    {
        name: 'Seafood Shack',
        cuisine: 'Seafood',
        averageRating: 4.6,
        averageCost: 30,
        media: PLACEHOLDER_IMAGE,
        description: 'Fresh seafood caught daily.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
 
        
        amenities: [2, 3],
        username: 'seafoodFan',
        password: 'securePassword9'
    },
    {
        name: 'Coffee Haven',
        cuisine: 'Cafe',
        averageRating: 4.5,
        averageCost: 5,
        media: PLACEHOLDER_IMAGE,
        description: 'Great coffee and cozy atmosphere.',

        address: '123 Pasta Street, Noodle City, 12345',
        phone: '(555) 123-4567',
        website: 'https://pastaparadise.com',
        hours: 'Mon-Sat 11:00 AM - 10:00 PM, Sun 12:00 PM - 9:00 PM',
 
        
        amenities: [1, 4],
        username: 'coffeeAddict',
        password: 'securePassword10'
    }
]

const users = [
    {
        username: 'john_doe',
        password: 'password123',
        cuisines: ['Italian', 'Mexican'],
        avatar: 'https://example.com/avatar/john_doe.png' // will surely fail to test Avatar Fallbacks
    },
    {
        username: 'jane_smith',
        password: 'password123',
        cuisines: ['Japanese', 'Chinese'],
        avatar: 'uploads/avatars/1730445679857-201075277.jpg',
        bio: "I'm a passionate food critic with a particular love for sushi and Japanese cuisine. Always on the hunt for the next great meal!"
    }
]

// Dummy data for reviews
const reviews = [
    {
        rating: 5,
        review: 'Amazing pizza, highly recommend!',
        media: [PLACEHOLDER_IMAGE],
        username: 'john_doe',
        title: 'Best Pizza!'
    },
    {
        rating: 4,
        review: 'Great sushi, fresh and delicious.',
        media: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
        username: 'jane_smith',
        title: 'Authentic Sushi'
    },
    {
        rating: 3,
        review: 'The burger was decent but could use more flavor.',
        media: [PLACEHOLDER_IMAGE],
        username: 'john_doe',
        title: 'Average Burger Experience'
    },
    {
        rating: 5,
        review: 'Loved the tacos! So much flavor and very authentic.',
        media: [],
        username: 'jane_smith',
        title: 'Fantastic Tacos'
    },
    {
        rating: 2,
        review: 'Coffee was too bitter for my taste.',
        media: [],
        username: 'john_doe',
        title: 'Not My Cup of Coffee'
    },
    {
        rating: 4,
        review: 'Nice selection of vegetarian options, will come again!',
        media: [PLACEHOLDER_IMAGE],
        username: 'jane_smith',
        title: 'Great Veggie Choices'
    },
    {
        rating: 5,
        review: 'The chocolate dessert was heavenly. Perfect end to a meal!',
        media: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],

        username: 'john_doe',
        title: 'Dessert Bliss'
    },
    {
        rating: 4,
        review: 'Good BBQ, nice smoky flavor but a bit pricey.',
        media: [],
        username: 'jane_smith',
        title: 'Solid BBQ Experience'
    },
    {
        rating: 5,
        review: 'Amazing seafood platter, everything was super fresh!',
        media: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
        username: 'john_doe',
        title: 'Fresh and Tasty Seafood'
    }
]

const responses = [
    {
        username: 'pizzapalace_owner',
        replyText: 'Thank you for your feedback!'
    },
    {
        username: 'sushiworld_owner',
        replyText: 'We appreciate your review!'
    }
]

module.exports = { restaurants, responses, reviews, users }
