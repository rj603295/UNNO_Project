<template>
  <div class="list-container">
    <div class="title-section">
      <div
        class="pointer"
        @click="handlePrevPage"
      >
        &lt;
      </div>
      <div>{{ detail.title }}</div>
      <div @click="handleEdit">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
      </div>
    </div>
    <div class="container">
      <div class="detail-container">
        <!-- 唯讀模式 -->
        <div v-if="status === 'read'">
          <div class="detail-column">
            <span>名稱&nbsp;&nbsp;&nbsp;</span>
            <span>{{ detail.title }}</span>
          </div>
          <div class="detail-column">
            <span>作者&nbsp;&nbsp;&nbsp;</span>
            <span>{{ detail.author }}</span>
          </div>
          <div class="detail-column">
            <span>備註&nbsp;&nbsp;&nbsp;</span>
            <span>{{ detail.description }}</span>
          </div>
        </div>
        <!-- 編輯模式 -->
        <div v-if="status === 'edit'">
          <Form
            :validation-schema="simpleSchema"
            @submit="onSubmit"
          >
            <div class="detail-input">
              <span>名稱</span>
              <Field
                v-model="title"
                name="title"
                type="text"
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
                type="text"
              />
            </div>
            <ErrorMessage
              name="author"
              class="error"
            />
            <div class="detail-input description">
              <span>備註</span>
              <input
                v-model="description"
                type="text"
              >
            </div>
            <div class="button-section">
              <button @click="status = 'read'">
                取消
              </button>
              <button>修改</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
  components: {
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
      detail: {},
      status: 'read',
      title: '',
      author: '',
      description: ''
    }
  },
  computed: {
    bookApiUrl () {
      const route = 'https://fe-interview-api.unnotech.com/books'
      const params = this.$route.params.bookId
      return `${route}/${params}`
    }
  },
  created () {
    this.getBookDetail()
  },
  methods: {
    handleEdit () {
      this.status = 'edit'
      this.title = this.detail.title
      this.author = this.detail.author
      this.description = this.detail.description
    },
    getBookDetail () {
      this.$http.get(this.bookApiUrl)
        .then((res) => {
          this.detail = res.data
        }).catch((err) => {
          return err
        })
    },
    updateBook () {
      this.$http.patch(this.bookApiUrl, {
        title: this.title,
        author: this.author,
        description: this.description
      }).then((res) => {
        this.status = 'read'
        this.getBookDetail()
      }).catch((err) => {
        return err
      })
    },
    handlePrevPage () {
      this.$router.push({ path: '/books' })
    },
    onSubmit (values) {
      this.updateBook()
    }
  }
}

</script>
<style lang="scss" scoped>
.list-container {
  width: 80%;
  margin: 0 auto;
}
.container {
  background: #f6f6f6;
  max-width: 1500px;
  margin: 0 auto;
}
.detail-container {
  padding-top: 20%;
  padding-bottom: 10%;
}
.detail-column {
  background: white;
  padding: 2%;
  margin: 20px 0px;
  width: 80%;
  margin: 0 auto;
  margin-top: 6%;
  font-size: calc(100vw/45);;
}
.title-section {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  font-size: calc(100vw/30);
  padding: 3% 0;
  font-weight: bold;
  text-align: center;
  svg {
    color: #488ded;
  }
  div:nth-child(odd) {
    cursor: pointer;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  div:nth-child(1) {
      justify-content: start;
  }

}
@media (max-width: 415px) {
  .list-container {
    width: 100%;
  }
}
</style>
