import React, { Component, Fragment } from "react"
import { FaStar, FaTag } from "react-icons/fa"
import { colleges } from "../data"

var COLLEGES = colleges
class CollegeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colleges: colleges.slice(0, 10)
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.trackScrolling)
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight
  }

  trackScrolling = event => {
    const wrappedElement = document.getElementById("header")
    if (this.isBottom(wrappedElement) && !this.state.scrollLock) {
      document.removeEventListener("scroll", this.trackScrolling)
      this.setState({ scrollLock: true }, () => {
        this.loadColleges()
      })
    }
  }

  loadColleges() {
    let length = this.state.colleges.length
    let collegeList = this.state.colleges
    let newColleges = colleges.slice(length, 10 + length)
    collegeList.push(...newColleges)
    setTimeout(this.setColleges, 500, collegeList)
    return true
  }

  setColleges = collegeList => {
    this.setState({ colleges: collegeList, scrollLock: false })
  }

  isNumeric(value) {
    return /^-{0,1}\d+$/.test(value)
  }

  makeOfferText(string) {
    let offerText = []
    for (let s in string) {
      if (this.isNumeric(string[s]))
        offerText.push(
          <span className="college-tile1-offer-text-color">{string[s]}</span>
        )
      else offerText.push(<span>{string[s]}</span>)
    }
    return offerText
  }

  render() {
    let collegeList = this.state.colleges

    return (
      <div id="header" className="App">
        <div className="App-container">
          <header className="App-header">Colleges in North India</header>
          <div className="App-body">
            {collegeList.map((el, index) => {
              let starCount = Math.abs(el.rating)
              let stars = []
              let offerText = this.makeOfferText(el.offertext)
              for (let i = 0; i < 5; i++) {
                stars.push(i < starCount)
              }
              return (
                <>
                  <div className="Rectangle-1">
                    {el.promoted ? (
                      <div className="vector">
                        <span className="vector-text"> PROMOTED</span>
                      </div>
                    ) : null}
                    <div className="college-img">
                      <img
                        className="college-img-fix"
                        width="637.3px"
                        height="233.2px"
                        src={process.env.PUBLIC_URL + el.image}
                      />
                      <div className="college-rating">
                        <div className="college-rating-text">
                          <span className="college-rating-text-imphasised">
                            {el.rating + " "}
                          </span>
                          /5
                          <div>{" " + el.rating_remarks}</div>
                        </div>
                      </div>
                      <div className="row-flex">
                        {el.tags.map(item => {
                          return (
                            <div className="college-tag1">
                              <div className="college-tag1-text">{item}</div>
                            </div>
                          )
                        })}
                        <div className="college-rank">#{el.ranking}</div>
                      </div>
                    </div>
                    <div className="college-details">
                      <div className="college-tile1">
                        <div>
                          {el.college_name}
                          {stars.map(item => {
                            return item ? (
                              <FaStar className="college-title-star" />
                            ) : (
                              <FaStar className="college-title-star1" />
                            )
                          })}
                        </div>
                        <div className="college-tile1-address">
                          {el.nearest_place.map((item, id) => {
                            return id === 0 ? (
                              <span className="college-tile1-address1">
                                {item}
                                {" | "}
                              </span>
                            ) : (
                              <span className="college-tile1-address2">
                                2 Kms away from bus stand
                              </span>
                            )
                          })}
                        </div>

                        <div className="college-tile1-misc">
                          <span className="college-tile1-misc-match">
                            {" "}
                            93% Match
                          </span>{" "}
                          :{el.famous_nearest_places}
                        </div>
                        <div className="college-tile1-offer">
                          <span className="college-tile1-offer-text">
                            {offerText}
                          </span>
                        </div>
                      </div>
                      <div className="college-tile2">
                        <span className="college-tile2-offer">
                          ₹{el.original_fees}{" "}
                          <FaTag className="college-tile2-tag" />
                        </span>
                        <div className="college-tile2-rate">
                          ₹{" " + el.discounted_fees}
                        </div>
                        <div className="college-tile2-rate1">
                          {el.fees_cycle}
                        </div>
                        <div className="college-tile2-perks">
                          {el.amenties.join(" . ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default CollegeList
