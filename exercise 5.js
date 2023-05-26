class Electricity {
    constructor() {
        this.powerElectricity = 2500;
    }
    checkElecPower(power)  {
        console.log(`Проверка доступной мощности..`)
        if ((Electricity.powerDeviceOn + power) < this.powerElectricity) {
            return true
        }
        else {
            console.log(`Мощность сети не позволяет включить ${this.name}`)
            return false
        }
    }
    static counterSumPower(power) {
        Electricity.counter += power
        console.log(`Общее потребление ${Electricity.counter.toFixed(2)}Вт`)
    }
}
Electricity.counter = 0
Electricity.powerDeviceOn = 0
class Device extends Electricity {
    constructor(name, power) {
        super();
        this.name = name;
        this.power = power;
        this.online = false;
        this.time = 0
    }
    plug() {
        if (this.online) {
            this.online = false;
            this.timeOff = Date.now();
            let used = (this.timeOff - this.timeOn)/3600000
            this.time += used
            Electricity.powerDeviceOn -= this.power
            console.log(`${this.name} отключен \nЗа время использования ${used.toFixed(3)} часа, прибор ${this.name} потребил ${(this.power * used).toFixed(2)} Вт`)
            Electricity.counterSumPower(this.power * used)
        }
        else if (this.checkElecPower(this.power)){
            this.online = true;
            this.timeOn = Date.now()
            Electricity.powerDeviceOn += this.power
            console.log(`${this.name} включен`)
        }
    }
    sumPowerDevice() {
        console.log(`За время службы прибор ${this.name} потребил ${(this.power * this.time).toFixed(2)} Вт`)
    }
}

class Lamp extends Device {
    constructor(name, power = 0, life) {
        super();
        this.name = name;
        this.power = power;
        this.life = life;
        this.numberLife = 0
    }
    plug() {
        if (this.numberLife<=this.life) {
            super.plug();
            if (this.online) {
                this.numberLife += 1
            }
        }
        else {
            console.log(`Срок службы лампы истек, пожалуйста, замените лампу`)
        }
    }
}

const lamp = new Lamp('светильник', 100, 3000)
const teapot = new Device('чайник', 1000)
const heater = new Device('обогреватель', 1500)

teapot.plug()
heater.plug()
lamp.plug()
teapot.plug()
heater.plug()
teapot.sumPowerDevice()
heater.plug()
console.log(Electricity.counter)

