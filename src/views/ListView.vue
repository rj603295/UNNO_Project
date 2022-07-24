<template>
  <div class="container">
    <div class="container-fuild text-center">
      <div class="title-section">
        <div></div>
        <div class="title">
          <h2 v-if="status === 'read'">
            書本列表
          </h2>
          <h2 v-else>
            新增書本
          </h2>
        </div>
        <div class="plus">
          <span
            v-if="status === 'read'"
            @click="status = 'add'"
          >+</span>
        </div>
      </div>
      <div class="list-container">
        <div
          v-if="status === 'read'"
          class="list"
        >
          <BookCard
            v-for="(book, index) in list"
            :key="index"
            :bookDetail="book"
          />
        </div>
        <!-- 新增模式 -->
        <div
          v-if="status === 'add'"
          class="add-section"
        >
          <Form
            :validation-schema="simpleSchema"
            @submit="onSubmit"
          >
            <div class="detail-input">
              <span>名稱</span>
              <Field
                v-model="title"
                name="title"
              />
            </div>
            <ErrorMessage
              name="title"
              class="error"
            />
            <div class="detail-input">
              <span>作者</span>
              <Field
                v-model="author"
                name="author"
              />
            </div>
            <ErrorMessage
              name="author"
              class="error"
            />
            <div class="detail-input">
              <span>備註</span>
              <input
                v-model="description"
                type="text"
              >
            </div>
            <div class="button-section">
              <button @click="status = 'read';handleReset()">
                取消
              </button>
              <button>新增</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
  components: {
    BookCard,
    Field,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    ErrorMessage
  },
  data () {
    const simpleSchema = {
      title (value) {
        if (value && value.trim()) {
          return true
        }
        return '名稱為必填'
      },
      author (value) {
        if (value && value.trim()) {
          return true
        }
        return '作者為必填'
      }
    }
    return {
      simpleSchema,
      list: [],
      status: 'read',
      title: '',
      author: '',
      description: ''
    }
  },
  created () {
    this.getBookList()
  },
  methods: {
    handleAddBook () {
      this.status = 'read'
      this.$http.post('https://fe-interview-api.unnotech.com/books/', {
        title: this.title,
        author: this.author,
        description: this.description
      }).then((res) => {
        this.getBookList()
      }).catch((err) => {
        return err
      })
    },
    getBookList () {
      this.$http.get('https://fe-interview-api.unnotech.com/books/')
        .then((res) => {
          this.list = res.data
        }).catch((err) => {
          return err
        })
    },
    handleReset () {
      this.title = ''
      this.author = ''
      this.description = ''
    },
    onSubmit (values) {
      this.handleAddBook()
      this.handleReset()
    }
  }
}

</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;

}
.list-container {
  background: #f6f6f6;
}
.add-section {
  padding-top: 20%;
}
.list {
  display: flex;
  max-width: 1500px;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: calc(100vw/25);
  font-weight: bold;
  padding: 3% 0;
}
.title-section {
  font-size: calc(100vw/25);;
  display: grid;
  grid-template-columns: 32% 36% 32%;
  span {
    display: block;
    cursor: pointer;
  }
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.plus {
  color: #4d88ed;
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
