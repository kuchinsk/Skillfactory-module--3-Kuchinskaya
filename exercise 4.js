function Electricity () {
    let powerElectricity = 2500;
    let counter = 0
    let powerDeviceOn = 0
    this.checkElecPower = function () {
        console.log(`Проверка доступной мощности..`)
        if ((powerDeviceOn + this.power) < powerElectricity) {
            powerDeviceOn += this.power
            return true
        } else {
            console.log(`Мощность сети не позволяет включить ${this.name}`)
            return false
        }
    }
    this.counterSumPower = function(power)  {
        counter += power
        console.log(`Общее потребление ${counter.toFixed(2)}Вт`)
    }
}

function Device(name, power) {
    this.name = name;
    this.power = power;
    this.online = false;
    this.time = 0
    this.plug = function () {
        if (this.online) {
            this.online = false;
            this.timeOff = Date.now();
            let used = (this.timeOff - this.timeOn) / 3600000
            this.time += used
            Electricity.powerDeviceOn -= this.power
            console.log(`${this.name} отключен \nЗа время использования ${used.toFixed(3)} часа, прибор ${this.name} потребил ${(this.power * used).toFixed(2)} Вт`)
            this.counterSumPower(this.power * used)
        } else if (this.checkElecPower()) {
            this.online = true;
            this.timeOn = Date.now()
            Electricity.powerDeviceOn += this.power
            console.log(`${this.name} включен`)
        }
    }
    this.sumPowerDevice = function () {
        console.log(`За время службы прибор ${this.name} потребил ${(this.power * this.time).toFixed(2)} Вт`)
    }
}
Device.prototype = new Electricity()
function Lamp (name, power, life) {
    this.name = name;
    this.power = power;
    this.life = life;
    this.numberLife = 0
    this.plug = function () {
        if (this.numberLife <= this.life) {
            if (this.online) {
                this.online = false;
                this.timeOff = Date.now();
                let used = (this.timeOff - this.timeOn) / 3600000
                this.time += used
                Electricity.powerDeviceOn -= this.power
                console.log(`${this.name} отключен \nЗа время использования ${used.toFixed(3)} часа, прибор ${this.name} потребил ${(this.power * used).toFixed(2)} Вт`)
                this.counterSumPower(this.power * used)
            } else if (this.checkElecPower()) {
                this.online = true;
                this.timeOn = Date.now()
                Electricity.powerDeviceOn += this.power
                console.log(`${this.name} включен`)
            }
            if (this.online) {
                this.numberLife += 1
            }
        }
        else {
            console.log(`Срок службы лампы истек, пожалуйста, замените лампу`)
        }
    }
}
Lamp.prototype = new Device()


const lamp = new Lamp('бра', 100, 3000)
const teapot = new Device('чайник', 1000)
const heater = new Device('обогреватель', 1500)

teapot.plug();
heater.plug();
lamp.plug();
teapot.plug();
heater.plug();
teapot.sumPowerDevice();
heater.plug()