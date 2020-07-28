const l = console.log

let favoriteCityId = 'rome'
l(favoriteCityId)

favoriteCityId = 'paris'
l(favoriteCityId)

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro']
l(citiesId)

//une erreur car c'est une constante et on essayer de modifier son contenu
//citiesId = []

citiesId.push('tokyo')
l(citiesId)

function getWeather(cityId) {
    const city = cityId.toUpperCase()
    const temperature = 20;
    return { city, temperature }
}

const weather = getWeather(favoriteCityId)
l(weather)

const [parisId, nycId, ...othersCitiesId] = citiesId
l(parisId)
l(nycId)
l(othersCitiesId.length)

class Trip {
    constructor(id, name, imageUrl) {
        this.id = id
        this.name = name
        this.imageUrl = imageUrl
    }

    get getPrice() {
        return this._price
    }

    set setPrice(newPrice) {
        this._price = newPrice
    }

    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de janeiro', 'img/rio-de-janeiro.jpg')
    }

    toString() {
        return 'Trip [' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this.price + ']'
    }
}

const parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg')
l(parisTrip)
l(parisTrip.name)

l(parisTrip.toString())

parisTrip.price = 100
l(parisTrip.toString())


const defaultTrip = Trip.getDefaultTrip();
l(defaultTrip)

class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl)
        this.price = 0;
    }

    toString() {
        return 'Free' + super.toString()
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg')
l(freeTrip.toString())

class TripService {
    constructor() {
        this.set1 = new Set([new Trip('paris', 'Paris', 'img/paris.jpg'), new Trip('nantes', 'Nantes', 'img/nantes.jpg'), new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')])
    }
    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (Array.from(this.set1).find(x => x.name === tripName) != undefined) {
                    resolve(Array.from(this.set1).find(x => x.name === tripName))
                } else {
                    reject('No trip with name ' + tripName)
                }
            }, 2000)
        });
    }
}
class PriceService {
    constructor() {
        this.map1 = new Map([])
        this.map1.set('paris', 100)
        this.map1.set('rio-de-janeiro', 800)
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (this.map1.has(tripId)) {
                    resolve(this.map1.get(tripId))
                } else {
                    reject('No price found for id ' + tripId)
                }


            }, 2000)
        });
    }
}

const tripService = new TripService()
const priceService = new PriceService()


tripService.findByName('Paris').then((value) => { l(value); }).catch(err => l(err))
tripService.findByName('Toulouse').then((value) => { l(value); }).catch(err => l(err))

tripService.findByName('Rio de Janeiro').then((value) => {
    priceService.findPriceByTripId(value.id).then((value) => { console.log(value); }).catch(err => l(err))
}).catch(err => l(err))

tripService.findByName('Nantes').then((value) => {
    priceService.findPriceByTripId(value.id).then((value) => { console.log(value); }).catch(err => l(err))
}).catch(err => l(err))