import React, { Component } from "react";
import Edited from "./component/edited";
import "./styles.css";
import { generateId } from "./util";

const labelArray = ["ID", "Name", "Location", "Office"];
const inputArray = ["Name", "Location", "Office", "OfficePhone"];
class App extends Component {
  state = {
    adressData: [],
    modified: new Set()
  };
  componentDidMount() {
    let cache = localStorage.getItem("adressData");
    if (cache) {
      this.setState({
        adressData: JSON.parse(cache)
      });
    }
  }
  addHandle = () => {
    const { adressData } = this.state;
    this.setState({
      adressData: [...adressData].concat({
        ID: "",
        Name: "",
        Location: "",
        Office: "",
        OfficePhone: "",
        CellPhone: "",
        checked: false
      })
    });
  };
  modify = (type, index, e) => {
    e.persist();
    const target = e.target;
    const value = type === "checked" ? target.checked : target.value;
    console.log(value);
    let { adressData, modified } = this.state;
    let copyDressData = adressData.slice(0);
    copyDressData[index][type] = value;
    this.setState({
      adressData: copyDressData,
      modified:
        copyDressData[index].ID && type !== "checked"
          ? modified.add(copyDressData[index].ID)
          : modified
    });
  };
  deleteHandle = () => {
    let { adressData, modified } = this.state;
    debugger;
    adressData
      .filter(el => !!el.ID)
      .forEach((el, index) => {
        if (el.checked === true) modified.add(adressData[index].ID);
      });
    console.log(modified);
    this.setState({
      adressData: adressData.filter(({ checked }) => checked === false),
      modified
    });
  };
  sort = type => {
    let { adressData } = this.state;
    console.log(adressData.sort((a, b) => a[type] - b[type]));
    this.setState({
      adressData: adressData.sort(function(a, b) {
        if (a[type] < b[type]) {
          return -1;
        }
        if (a[type] > b[type]) {
          return 1;
        }
        return 0;
      })
    });
  };
  updateHandle = () => {
    let { modified, adressData } = this.state;
    let newRow = adressData.filter(el => !el.ID);
    let modifiedRow = Array.from(modified.values());
    if (newRow.length && modifiedRow.length) {
      alert(
        `ID:${modifiedRow.join(",")} and ${
          newRow.length
        } new row  need to update`
      );
    } else if (newRow.length) {
      alert(`${newRow.length} new row need to update`);
    } else if (modifiedRow.length) {
      alert(`ID:${modifiedRow.join(",")} need to update`);
    } else {
      alert("none row need to update");
    }
    adressData = adressData.map(el => {
      if (el.ID) return el;
      return {
        ...el,
        ID: generateId()
      };
    });
    this.setState({
      modified: new Set(),
      adressData
    });
    localStorage.setItem("adressData", JSON.stringify(adressData));
  };
  render() {
    const { adressData } = this.state;

    return (
      <div className="wrapper">
        <div className="adress-table">
          <div className="adress-table-header">
            {labelArray.map(el => (
              <div
                className="adress-table-header-label"
                key={el}
                onClick={this.sort.bind(this, el)}
              >
                <span>{el}</span>
              </div>
            ))}
            <div className="adress-table-header-label phone-label">
              <div>Phone</div>
              <div className="sub-label">
                <span onClick={this.sort.bind(this, "OfficePhone")}>
                  Office
                </span>
                <span onClick={this.sort.bind(this, "CellPhone")}>Cell</span>
              </div>
            </div>
          </div>
          <div className="adress-table-body">
            {adressData.map((el, index) => (
              <div className="adress-item" key={index}>
                <input
                  type="checkbox"
                  checked={el.checked}
                  onChange={this.modify.bind(this, "checked", index)}
                />
                <span className="label-placeHolder">{el.ID}</span>
                {inputArray.map(type => (
                  <input
                    key={type}
                    className="adress-item-input"
                    value={el[type]}
                    onChange={this.modify.bind(this, type, index)}
                  />
                ))}
                <Edited
                  value={el.CellPhone}
                  change={this.modify.bind(this, "CellPhone", index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="btn-group">
          <button className="add-btn" onClick={this.addHandle}>
            add
          </button>
          <button className="deleted-btn" onClick={this.deleteHandle}>
            deleted
          </button>
          <button className="update-btn" onClick={this.updateHandle}>
            update
          </button>
        </div>
      </div>
    );
  }
}

export default App;
