const initialShoppingLists = [
    {
        id: 1,
        title: "Groceries 🛒",
        owner: {id: 1, name: "Mike"},
        archived: false,
        members: [
            {id: 1, name: "Mike"},
            {id: 2, name: "Larry"},
            {id: 3, name: "John"},
            {id: 4, name: "Kate"}
        ],
        items: [
            {id: 1, text: "Milk 🥛"},
            {id: 2, text: "Bread 🍞"},
            {id: 3, text: "Eggs 🥚"},
            {id: 4, text: "Apples 🍎"},
            {id: 5, text: "Bannana 🍌"},
        ]
    },
    {
        id: 2,
        title: "Trip shopping 🏕️",
        owner: {id: 1, name: "Mike"},
        archived: false,
        members: [
            {id: 2, name: "Larry"},
            {id: 1, name: "Mike"},
        ],
        items: [
            {id: 1, text: "Hiking boots 🥾"},
            {id: 2, text: "Tent 🏕️"},
            {id: 3, text: "Gloves 🧤"},
            {id: 4, text: "Hat 🧢"},
            {id: 5, text: "Beer 🍺"},
            {id: 6, text: "Water 💧"},
            {id: 7, text: "Food 🍕"},
        ]
    },
    {
        id: 3,
        title: "Drug store 💊",
        owner: {id: 1, name: "Mike"},
        archived: false,
        members: [
            {id: 1, name: "Mike"},
            {id: 3, name: "John"},
        ],
        items: [
            {id: 1, text: "Tooth paste 🦷"},
            {id: 2, text: "Shampoo 🧴"},
            {id: 3, text: "Soap 🧼"},
            {id: 4, text: "Toilet paper 🧻"},
            {id: 5, text: "Conditioner 💆"},
        ]
    },
    {
        id: 4,
        title: "Snacks 🍿",
        owner: {id: 1, name: "Mike"},
        archived: false,
        members: [
            {id: 1, name: "Mike"},
            {id: 4, name: "Kate"},
        ],
        items: [
            {id: 1, text: "Chocolate 🍫"},
            {id: 2, text: "Cola 🥤"},
            {id: 3, text: "Marshmallows 🍡"},
            {id: 4, text: "Chips 🍟"},
            {id: 5, text: "Pretzels 🥨"},
        ]
    },
    {
        id: 5,
        title: "Healthy food 🥗",
        owner: {id: 1, name: "Mike"},
        archived: false,
        members: [
            {id: 1, name: "Mike"},
            {id: 2, name: "Larry"},
        ],
        items: [
            {id: 1, text: "Avocado 🥑"},
            {id: 2, text: "Oats 🥣"},
            {id: 3, text: "Rice 🍚"},
            {id: 4, text: "Salmon 🐟"},
            {id: 5, text: "Chicken 🍗"},
        ]
    },
    {
        id: 6,
        title: "Electronics 📱",
        owner: {id: 1, name: "Mike"},
        archived: false,
        members: [
            {id: 1, name: "Mike"},
            {id: 4, name: "Kate"},
        ],
        items: [
            {id: 1, text: "iPhone 📱"},
            {id: 2, text: "MacBook Pro 💻"},
            {id: 3, text: "AirPods 🎧"},
            {id: 4, text: "iPad 📟"},
            {id: 5, text: "Apple Watch ⌚"},
        ]
    }
]

const users = [
    {id: 1, name: 'Mike'},
    {id: 2, name: 'Larry'},
    {id: 3, name: 'John'},
    {id: 4, name: 'Kate'},
    {id: 5, name: 'Mary'},
];

export {initialShoppingLists, users};