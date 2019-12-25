<template>
  <div class="webrtc">
    <div>
      <a-row type="flex">
        <a-col :span="12" :order="1">
          <div>
            <video src id="rtcA" controls autoplay></video>
          </div>
          <div>
            <a-textarea name="acceptMessage" placeholder="接受消息" :rows="4" :span="12" />
          </div>
        </a-col>
        <a-col :span="12" :order="2">
          <div>
            <video src id="rtcB" controls autoplay></video>
          </div>

          <div>
            <a-textarea placeholder="发送消息" :rows="4" :span="12" v-model="messages" />
          </div>

          <div>
            <a-button type="primary" @click="call" :disabled="allowCall">呼叫</a-button>
            <a-button type="primary" @click="hangup" :disabled="allowHangup">挂断</a-button>
            <a-button type="primary" @click="sendMessage">发送消息</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "webrtc",
  data() {
    return {
      // localstream: null
      messages: "1111",
      peerA: null,
      peerB: null,
      channelA: null,
      channelB: null,
      receiveText: "",
      messageOpen: false,
      allowCall: true,
      allowHangup: true,
      offerOption: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }
    };
  },
  methods: {
    sendMessage() {
      console.log(this.messages);
      this.channelB.send;
    },
    async call() {
      if (!this.peerA || !this.peerB) {
        // 判断是否有对应实例，没有就重新创建
        this.initPeer();
      }
      try {
        let offer = await this.peerB.createOffer(this.offerOption); // 创建 offer
        await this.onCreateOffer(offer);
      } catch (e) {
        console.log("createOffer: ", e);
      }

      this.allowCall = true;
      this.allowHangup = false;
    },
    async onCreateOffer(desc) {
      try {
        await this.peerB.setLocalDescription(desc); // 呼叫端设置本地 offer 描述
      } catch (e) {
        console.log("Offer-setLocalDescription: ", e);
      }
      try {
        await this.peerA.setRemoteDescription(desc); // 接收端设置远程 offer 描述
      } catch (e) {
        console.log("Offer-setRemoteDescription: ", e);
      }
      try {
        let answer = await this.peerA.createAnswer(); // 接收端创建 answer
        await this.onCreateAnswer(answer);
      } catch (e) {
        console.log("createAnswer: ", e);
      }
    },
    async onCreateAnswer(desc) {
      try {
        await this.peerA.setLocalDescription(desc); // 接收端设置本地 answer 描述
      } catch (e) {
        console.log("answer-setLocalDescription: ", e);
      }
      try {
        await this.peerB.setRemoteDescription(desc); // 呼叫端设置远程 answer 描述
      } catch (e) {
        console.log("answer-setRemoteDescription: ", e);
      }
    },
    hangup() {
      this.peerA.close();
      this.peerB.close();
      this.channelA.close();
      this.channelB.close();
      this.peerA = null;
      this.peerB = null;
      this.channelA = null;
      this.channelB = null;
      this.sendText = "";
      this.receiveText = "";
      this.allowCall = false;
      this.allowHangup = true;
    },
    async createMedia() {
      this.localstream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      let video = document.querySelector("#rtcA");
      video.srcObject = this.localstream;
      console.log(this.localstream);
      this.initPeer();
    },
    initPeer() {
      //创建输出端 peerConnection
      let PeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      console.log("mounted");
      console.log(PeerConnection);
      this.peerA = new PeerConnection();
      this.peerA.addStream(this.localstream);
      //监听A的ICE的候选信息， 如果收集到就添加给B
      this.peerA.onicecandidate = event => {
        if (event.candidate) {
          this.peerB.addIceCandidate(event.candidate);
        }
      };

      this.peerA.ondatachannel = event => {
        console.log("ondatachannel-event:" + event);
        this.channelA = event.channel;
        this.channelA.binaryType = "arraybuffer";
        this.channelA.onopen = e => {
          console.log("channelA onopen", e);
        };
        this.channelA.onclose = e => {
          console.log("channelA onclose", e);
        };
        this.channelA.onmessage = e => {
          this.receiveText = JSON.parse(e.data).name;
          console.log("channelA onmessage", e.data);
        };
      };

      //创建呼叫端
      this.peerB = new PeerConnection();
      this.peerB.onaddstream = event => {
        console.log("event-stream", event.stream);
        let video = document.querySelector("#rtcB");
        console.log("videoB", video);
        video.srcObject = event.stream;
      };
      this.channelB = this.peerB.createDataChannel("messagechannel");
      console.log("this.channelB", this.channelB);
      this.channelB.binaryType = "arraybuffer";
      this.channelB.onopen = event => {
        console.log("channelB onopen", event);
        this.messageOpen = true;
      };
      this.channelB.onclose = function(event) {
        console.log("channelB onclose", event);
      };
      // 监听 B 的ICE候选信息
      // 如果收集到，就添加给 A
      this.peerB.onicecandidate = event => {
        if (event.candidate) {
          this.peerA.addIceCandidate(event.candidate);
        }
      };
      this.allowCall = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createMedia();
    });

    window.addEventListener("keydown", e => {
      if (!e.repeat)
        console.log(`第一个 keydown 事件。key 属性的值为"${e.key}"`);
      else console.log(`keydown 事件重复。key 属性的值为"${e.key}"`);

      return;
    });

    // textarea.addEventListener('beforeinput', (e) => {
    //   logMessage(`beforeinput 事件。你准备输入"${e.data}"`);
    // });

    // textarea.addEventListener('input', (e) => {
    //   logMessage(`input 事件。你刚刚输入了"${e.data}"`);
    // });

    // textarea.addEventListener('keyup', (e) => {
    //   logMessage(`keyup 事件。key 属性的值为"${e.key}"`);
    // });
  }
};
</script>

<style scoped>
.webrtc {
  margin-top: 50px;
}
</style>
