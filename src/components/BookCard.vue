<template>
  <div
    class="list-item"
    @click="handleBookDetail"
  >
    <div class="book">
      書名：{{ bookDetail.title }}
      <br />
      作者：{{ bookDetail.author }}
      <br />
      備註：{{ bookDetail.description }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bookDetail: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleBookDetail () {
      this.$router.push({ path: `books/${this.bookDetail.id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
.list-item {
  position: relative;
  box-sizing: border-box;
  margin: 4% 3%;
  width: 40%;
  // height: calc(80vh);
  padding-bottom: 55%;
  background-color: white;
  cursor: pointer;
  &:hover {
  transition: 0.5s all;
   box-shadow:0 0 30px 5px grey;
  }
}
.book {
  position: absolute;
  bottom: 20px;
  border: 1px solid black;
  text-align: left;
  padding: 5%;
  width: 80%;
  height: 20%;
  overflow: scroll;
  left: 50%;
  font-size: calc(100vw/100);
  transform: translate(-50%, 0);
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
    background-color: white;
    -webkit-height: 10px;
  }
  //捲軸寬度
  &::-webkit-scrollbar {
    width: 2px;
    height: 0;
    background-color: black;
  }
  //捲軸本體顏色
  &::-webkit-scrollbar-thumb {
    background-color: #f6f6f6;
  }
}
  @media (max-width: 415px) {
    .book {
      height: 30%;
    }
  }
</style>
