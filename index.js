//create Register Class
class Register {

    static counter = 1;

    constructor(name, age, allowance, counter) {
        this.name = name;
        this.age = age;
        this.allowance = allowance;
        this.counter = counter;
    }

    // Create Submit
    static handleSubmit(event) {
        event.preventDefault();

        let getName = document.getElementById("name");
        let name = getName.value;

        let getAge = document.getElementById("age");
        let age = parseInt(getAge.value);

        let getAllowance = document.getElementById("allowance");
        let allowance = parseInt(getAllowance.value);

        this.checkingData(name, age, allowance)
            .then(() => {
                let success = document.getElementById("success");
                success.innerHTML = "Data Berhasil Di-Input";
                success.classList.remove("d-none");

                let danger = document.getElementById("danger");
                danger.classList.add("d-none");
            })
            .catch((error) => {
                let danger = document.getElementById("danger");
                danger.innerHTML = error;
                danger.classList.remove("d-none");

                let success = document.getElementById("success");
                success.classList.add("d-none");
            });

        this.resume();
    }

    //Validasi Data using condition
    static checkingData(name, age, allowance) {
        return new Promise((resolve, reject) => {
            if(name == "" || age == "" || allowance == "" ){
                reject("Tidak Boleh Kosong!");
            } else if (name.length < 10) {
                reject("Nama harus lebih dari 10 kata");
            } else if (age < 25) {
                reject("Umur Minimal 25 tahun.");
            } else if (allowance < 100000) {
                reject("Uang sangu harus lebih dari 100.000");
            } else if (allowance > 1000000) {
                reject("Uang sangu harus kurang dari 1.000.000");
            }else {
                let newRegister = new Register(name, age, allowance, this.counter++)
                newRegister.tableRow();
                newRegister.tableData();
                resolve(newRegister);
            }
        });
    }

    // create row in table
    tableRow() {
        this.createRow = document.createElement('tr');
        this.createRow.setAttribute('id', `tr-${this.counter}`);
        document.getElementById('table-body').appendChild(this.createRow);
    }

    // create column in table
    tableData() {
        this.createCellName = document.createElement('td');
        this.createDataName = document.createTextNode(this.name);
        this.createCellName.appendChild(this.createDataName);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellName);

        this.createCellAge = document.createElement('td');
        this.createDataAge = document.createTextNode(this.age);
        this.createCellAge.appendChild(this.createDataAge);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellAge);

        this.createCellAllowance = document.createElement('td');
        this.createDataAllowance = document.createTextNode(this.allowance);
        this.createCellAllowance.appendChild(this.createDataAllowance);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellAllowance);
    }

    // Create bagian resume
    static resume() {
        let totalAge = 0;
        let totalAllowance = 0;
        let countAge = 0;
        let countAllowance = 0;
        let age = document.getElementsByTagName("td");
        let allowance = document.getElementsByTagName("td");

        for (let index = 1; index <= age.length; index += 3) {
            totalAge += parseInt(age[index].innerHTML);
            countAge++;
        }

        for (let index = 2; index <= allowance.length; index += 3) {
            totalAllowance += parseInt(allowance[index].innerHTML);
            countAllowance++;
        }

        let avgAge = Math.round(totalAge / countAge);
        let avgAllowance = Math.round(totalAllowance / countAllowance);

        document.getElementById("avg-age").innerHTML = avgAge;
        document.getElementById("avg-allowance").innerHTML = `IDR ${avgAllowance}`;
    }
}
