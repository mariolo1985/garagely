import React, { Component, PropTypes } from 'react';

class ReviewRatings extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.displayRating = this.displayRating.bind(this);
    }
    componentDidMount() {
        var funcCheckRating = this.checkRating;

        $('.star-wrapper').hover(function () {
            funcCheckRating(this);
        });
        $('.star-wrapper').click(function () {
            funcCheckRating(this);
        });

    }
    checkRating(starWrapper) {
        var sWrapper = $(starWrapper),
            fullStars,
            emptyStars,
            starCount,
            sVal;

        sVal = sWrapper.siblings('.rating-value');
        fullStars = sWrapper.prevAll().addBack();
        starCount = fullStars.length;
        fullStars.each(function (index, item) {
            $(item).removeClass('empty');
            $(item).removeClass('half');
            $(item).addClass('full');
        });
        sVal.html(starCount);

        emptyStars = sWrapper.nextAll();
        emptyStars.each(function (index, item) {
            $(item).removeClass('full');
            $(item).removeClass('half');
            $(item).addClass('empty');
        })
    }
    displayRating() {
        if (this.props.rating) {
            var rating = this.props.rating;
            var ratingArr = ['full', 'full', 'full', 'empty', 'empty'];

            if (rating > 4) {
                // 4.5
                ratingArr = ['full', 'full', 'full', 'full', 'half'];
            } else if (rating > 3.5) {
                // 4
                ratingArr = ['full', 'full', 'full', 'full', 'empty'];
            } else if (rating > 3) {
                // 3.5
                ratingArr = ['full', 'full', 'full', 'half', 'empty'];
            } else if (rating > 2.5) {
                // 3
                ratingArr = ['full', 'full', 'full', 'empty', 'empty'];
            } else if (rating > 2) {
                // 2.5
                ratingArr = ['full', 'full', 'half', 'empty', 'empty'];
            } else if (rating > 1.5) {
                // 2
                ratingArr = ['full', 'full', 'empty', 'empty', 'empty'];
            } else if (rating > 1) {
                // 1.5
                ratingArr = ['full', 'half', 'empty', 'empty', 'empty'];
            } else {
                ratingArr = ['full', 'empty', 'empty', 'empty', 'empty'];
            }
            return ratingArr;

        } else {
            return ['full', 'full', 'full', 'empty', 'empty'];// DEFAULT
        }
    }
    render() {
        var ratingArr = this.displayRating();
        return (
            <div className='ratings-container clear'>
                {ratingArr.map((item, i) => {
                    var starClass = "star-wrapper " + item;
                    return (
                        <div className={starClass} key={i}>
                            <i className='star star-full fa fa-star'></i>
                            <i className='star star-half fa fa-star-half-o'></i>
                            <i className='star star-empty fa fa-star-o'></i>
                        </div>
                    )
                })}
                <div className='rating-value'></div>
            </div>
        )

    }// end render
}

export default ReviewRatings;