var app = new Vue({
    el: '#app',
    // storing the state of the page
    data: {
        connected: false,
        ros: null,
        logs: [],
        loading: false,
        rosbridge_address: '',
        port: '9090',
        service_busy: false,
       
    },
    // helper methods to connect to ROS
    methods: {
        connect: function() {
            this.loading = true
            this.ros = new ROSLIB.Ros({
                url: this.rosbridge_address
            })
            this.ros.on('connection', () => {
                this.logs.unshift((new Date()).toTimeString() + ' - Connected!')
                this.connected = true
                this.loading = false
            })
            this.ros.on('error', (error) => {
                // this.logs.unshift((new Date()).toTimeString() +  - Error: ${error})
                this.logs.unshift((new Date()).toTimeString() +  - Error)
            })
            this.ros.on('close', () => {
                this.logs.unshift((new Date()).toTimeString() + ' - Disconnected!')
                this.connected = false
                this.loading = false
            })
        },
        disconnect: function() {
            this.ros.close()
        },
    
    },

    occupyGrid: function(){
        let topic = new ROSLIB.Topic({
            isShown: true,
            name: "Map",
            options: {
              continuous: true,
              opacity: 1,
              topic: "/map"
            },
            type: "occupancyGrid"
          })
          
        },


        
    
})




// const btngrid = document.querySelector('.btn--grid');

// btngrid.addEventListener('click', function () {

// const occupyGrid = function(){
//     var topic = new ROSLIB.Topic({
//         isShown: true,
//         name: "Map",
//         options: {
//           continuous: true,
//           opacity: 1,
//           topic: "/map",
//           type: "occupancyGrid"
//         },
        
//         })
//     },
// })



