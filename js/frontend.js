var CurrentDate = React.createClass({
    render: function() {
        var dateObj = new Date ();
        var day = dateObj.getDate();
        var month = dateObj.getMonth() + 1;
        var year = dateObj.getFullYear();

        if(month < 10) {
            month = "0" + month;
        }

        return (
            <span>DATE {day}/{month}/{year}</span>
        );
    }
});

var CurrentTime = React.createClass({
    setTime: function() {
        var dateObj = new Date ();
        var hours = dateObj.getHours();

        // correct for number over 24, and negatives
        if(hours >= 24){hours -= 24;}
        if(hours < 0){hours += 12;}

        // add leading zero, first convert hours to string
        hours = hours.toString();
        if(hours.length == 1){hours = "0" + hours;}

        // minutes are the same on every time zone
        var minutes = dateObj.getUTCMinutes();

        // add leading zero, first convert minutes to string
        minutes = minutes.toString();
        if(minutes.length == 1){minutes = "0" + minutes;}

        var seconds = dateObj.getUTCSeconds();

        // add leading zero, first convert minutes to string
        seconds = seconds.toString();
        if(seconds.length == 1){seconds = "0" + seconds;}

        this.setState({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
    },

    componentWillMount: function(){
        this.setTime();
    },

    componentDidMount: function(){
        window.setInterval(function() {
            this.setTime();
        }.bind(this), 1000);
    },

    render: function() {
        return (
            <span>TIME {this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
        );
    }
});

var ElapsedTime = React.createClass({
    getInitialState: function() {
        return {secondsElapsed: 0};
    },

    tick: function() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    },

    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        return (
            <span>REC 00:00:{this.state.secondsElapsed}</span>
        );
    }
});

ReactDOM.render(
    <CurrentDate />,
    document.getElementById('date')
);

ReactDOM.render(
    <CurrentTime />,
    document.getElementById('time')
);

ReactDOM.render(
    <ElapsedTime />,
    document.getElementById('rec')
);
