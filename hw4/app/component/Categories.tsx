export default function Categories() {
    const categories = [
        { name: 'Услуги', image: '/categ.png' },
        { name: 'Строительство и ремонт', image: '/categ.png' },
        { name: 'Аренда и прокат товаров', image: '/categ.png' },
        { name: 'Недвижимость', image: '/categ.png' },
        { name: 'Электроника', image: '/categ.png' },
        { name: 'Дом и сад', image: '/categ.png' },
        { name: 'Работа', image: '/categ.png' },
        { name: 'Мода и стиль', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
        { name: 'Детский мир', image: '/categ.png' },
    ];

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-14 text-center">Разделы на сервисе OLX</h2>
                <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
                    {categories.map((category) => (
                        <div key={category.name} className="flex flex-col items-center text-center mb-10 ">
                            <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center mb-2 cursor-pointer">
                                <img src={category.image} alt={category.name} className="h-12 w-12"/>
                            </div>
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}