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
    }
})

var app = new Vue({
    el: '#deliver',
    // storing the state of the page
    data:function(){
       
    return{
        value: '',
    }
       
    },
    served: {
        no_table: function(){
            this.action = new ROSLIB.action({
                table_to_go : this.value,
                name: /action/
            })
            console.log(table_to_go)
        }
    }

    
})