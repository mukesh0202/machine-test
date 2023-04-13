import { Component } from '@angular/core';

interface country {
  name: string;
  id: string;
}

interface state {
  name: string;
  id: string;
  parentId: string;
}
interface city {
  name: string;
  id: string;
  parentId: string;
}
interface place {
  name: string;
  id: string;
  parentId: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Airamatrix';
  selectedValue: string | undefined;
  stateselectedValue: string | undefined;
  cityselectedValue: string | undefined
  placeselectedValue: string | undefined
  Country: country[] = [];
  Sates: state[] = [];
  cities: city[] = [];
  places: place[] = [];
  showcity: boolean = false;
  showState: boolean = false;
  showplace: boolean = false;

  // constructor() { }


  ngOnInit() {
    this.getObject();
  }
//this function is for getting array into objcet our first Q from given assignmnet  and country
  getObject() {
    let firstLevelArr = [
      { id: "1", name: "India" },
      { id: "2", name: "Germany" }
    ];
    let secondLevelArr = [
      { id: "s1", parentId: "2", name: "Bavaria" },
      { id: "s2", parentId: "2", name: "Berlin" },
      { id: "s3", parentId: "1", name: "Maharashtra" },
      { id: "s4", parentId: "1", name: "Tamilnadu" }
    ];
    let thirdLevelArr = [
      { id: "d1", parentId: "s1", name: "Upper Bavaria" },
      { id: "d2", parentId: "s1", name: "Lower Bavaria" },
      { id: "d3", parentId: "s2", name: "Berlin-Mitte" },
      { id: "d4", parentId: "s2", name: "Kreuzberg" },
      { id: "d5", parentId: "s3", name: "Nashik" },
      { id: "d6", parentId: "s3", name: "Jalgoan" },
      { id: "d7", parentId: "s4", name: "Ariyalur" },
      { id: "d8", parentId: "s4", name: "Chennai" }
    ];
    let fourthLevelArr = [
      { id: "p1", parentId: "d1", name: "Munich" },
      { id: "p2", parentId: "d1", name: "Erding" },
      { id: "p3", parentId: "d2", name: "Leipzig" },
      { id: "p4", parentId: "d2", name: "Landshut" },
      { id: "p5", parentId: "d3", name: "Passau" },
      { id: "p6", parentId: "d3", name: "Gesundbrunnen" },
      { id: "p7", parentId: "d4", name: "Frieburg" },
      { id: "p8", parentId: "d4", name: "Hamburg" },
      { id: "p9", parentId: "d6", name: "Raver" },
      { id: "p10", parentId: "d6", name: "Savda" },
      { id: "p11", parentId: "d5", name: "Ozar" },
      { id: "p12", parentId: "d5", name: "Manmad" },
      { id: "p13", parentId: "d7", name: "Thirumanur" },
      { id: "p14", parentId: "d7", name: "Sendurai" },
      { id: "p15", parentId: "d8", name: "New Chennai" },
      { id: "p16", parentId: "d8", name: "Old Chennai" }
    ];

    const countries = {};
    firstLevelArr.forEach(firstLevel => {
      countries[`0${firstLevel.id}`] = {
        countryName: firstLevel.name,
        states: {}
      };
      secondLevelArr.forEach(secondLevel => {
        if (secondLevel.parentId === firstLevel.id) {
          countries[`0${firstLevel.id}`].states[secondLevel.id] = {
            stateName: secondLevel.name,
            districts: {}
          };
          thirdLevelArr.forEach(thirdLevel => {
            if (thirdLevel.parentId === secondLevel.id) {
              countries[`0${firstLevel.id}`].states[secondLevel.id].districts[thirdLevel.id] = {
                districtName: thirdLevel.name,
                places: {}
              };
              fourthLevelArr.forEach(fourthLevel => {
                if (fourthLevel.parentId === thirdLevel.id) {
                  countries[`0${firstLevel.id}`].states[secondLevel.id].districts[thirdLevel.id].places[fourthLevel.id] = {
                    placeName: fourthLevel.name
                  };
                }
              });
            }
          });
        }
      });
    });

    this.Country = JSON.parse(JSON.stringify(firstLevelArr))
  }
// this function will give us state
  getState(e: any) {
    this.showcity = false;
    this.showplace = false;

    if (e.value) {
      let firstLevelArr = [
        { id: "1", name: "India" },
        { id: "2", name: "Germany" }
      ];
      let secondLevelArr = [
        { id: "s1", parentId: "2", name: "Bavaria" },
        { id: "s2", parentId: "2", name: "Berlin" },
        { id: "s3", parentId: "1", name: "Maharashtra" },
        { id: "s4", parentId: "1", name: "Tamilnadu" }
      ];
     
      let secondLevelArr1 = secondLevelArr.filter(item => item.parentId === firstLevelArr[e.value - 1].id);
      this.Sates = JSON.parse(JSON.stringify(secondLevelArr1))
      this.showState = true;
    }

  }
// this function will give us city
  getCity(e: any) {
    this.showplace = false;
    const selectedIndex = e;
    console.log("selectedIndex: ", selectedIndex.value);

    if (e.value) {
      
      let thirdLevelArr = [
        { id: "d1", parentId: "s1", name: "Upper Bavaria" },
        { id: "d2", parentId: "s1", name: "Lower Bavaria" },
        { id: "d3", parentId: "s2", name: "Berlin-Mitte" },
        { id: "d4", parentId: "s2", name: "Kreuzberg" },
        { id: "d5", parentId: "s3", name: "Nashik" },
        { id: "d6", parentId: "s3", name: "Jalgoan" },
        { id: "d7", parentId: "s4", name: "Ariyalur" },
        { id: "d8", parentId: "s4", name: "Chennai" }
      ];
     
      const result = thirdLevelArr.filter((item) => {
        return item.parentId === selectedIndex.value
      })
      this.cities = JSON.parse(JSON.stringify(result))
      this.showcity = true;
    }

  }
// this function will give us places
  getPlaces(e: any) {
    const selectedIndex = e;
    console.log("selectedIndex: ", selectedIndex.value);

    if (e.value) {
      let fourthLevelArr = [
        { id: "p1", parentId: "d1", name: "Munich" },
        { id: "p2", parentId: "d1", name: "Erding" },
        { id: "p3", parentId: "d2", name: "Leipzig" },
        { id: "p4", parentId: "d2", name: "Landshut" },
        { id: "p5", parentId: "d3", name: "Passau" },
        { id: "p6", parentId: "d3", name: "Gesundbrunnen" },
        { id: "p7", parentId: "d4", name: "Frieburg" },
        { id: "p8", parentId: "d4", name: "Hamburg" },
        { id: "p9", parentId: "d6", name: "Raver" },
        { id: "p10", parentId: "d6", name: "Savda" },
        { id: "p11", parentId: "d5", name: "Ozar" },
        { id: "p12", parentId: "d5", name: "Manmad" },
        { id: "p13", parentId: "d7", name: "Thirumanur" },
        { id: "p14", parentId: "d7", name: "Sendurai" },
        { id: "p15", parentId: "d8", name: "New Chennai" },
        { id: "p16", parentId: "d8", name: "Old Chennai" }
      ];

      const result = fourthLevelArr.filter((item) => {
        return item.parentId === selectedIndex.value
      })
      this.places = JSON.parse(JSON.stringify(result))
      this.showplace = true;
    }

  }





}
//we can make more dynamic and shorter code but because of less time i have implemnted this.