<template>
  <div>
    <div class="outer">
      <div class="container">
        <div class="element">
          <h1 class="toggle">
            Alexandria.Works
          </h1>
          <div
            ref="webchatAlexandria"
            style="width: 90%; min-height: 70vh; margin:0 auto; max-height: 70vh"
          />
        </div>
        <div class="element">
          <h1 class="toggle">
            Citybot Nalantis
          </h1>
          <div
            ref="webchatNalantis"
            style="width: 90%; min-height: 70vh; margin:0 auto; max-height: 70vh"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { alexandriaOptions, nalantisOptions } from '../store/bot.options';

export default {
  components: {},
  mounted() {
    fetch('https://webchat.botframework.com/api/tokens', {
      headers: {
        Authorization: 'Botconnector U2mMinuaLlY.CMSpLZ2jjb7598NNWY0Pu2PcrTmLGeZtARZq058tS-I',
      },
    })
      .then(res => res.text())
      .then(t => t.split('"')[1])
      .then((token) => {
        window.WebChat.renderWebChat(
          {
            directLine: window.WebChat.createDirectLine({ token }),
            nalantisOptions,
          },
          this.$refs.webchatNalantis,
        );
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
    fetch('https://webchat.botframework.com/api/tokens', {
      headers: {
        Authorization: 'Botconnector SL069aFOrKE.E2WHjUq125m5SzdtToxE7MobXU4o7WlFmWeaYlv2H54',
      },
    })
      .then(res => res.text())
      .then(t => t.split('"')[1])
      .then((token) => {
        window.WebChat.renderWebChat(
          {
            directLine: window.WebChat.createDirectLine({ token }),
            styleOptions: alexandriaOptions,
          },
          this.$refs.webchatAlexandria,
        );
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  },
};
</script>
<style lang="scss" scoped>
.outer {
  &-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .input-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 0;
      width: 50%;
      label {
        width: 78%;
        input {
          background-color: #fff;
          border-radius: 20px 0 0 20px;
          padding: 0 1.5em;
          margin: 0;
          font: 400 1em/46px "Lato", Arial;
          border: 0;
          height: 46px;
          width: 100%;
          box-shadow: none;
          box-sizing: border-box;

          &:focus {
            border: 0;
            outline: 0;
          }
        }
      }
      button {
        width: 21%;
        background-color: #d1b122;
        color: #fff;
        border-radius: 0 20px 20px 0;
        line-height: 46px;
        height: 46px;
        border: 0;
        outline: 0;
        padding: 0 !important;
        margin: 0 !important;
        display: inline-block;
        vertical-align: top;
        text-transform: none;
        text-align: center;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        &:hover {
          color: #fff;
          background-color: #977e0e;
        }
      }
    }
  }

  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    .element {
      flex-grow: 1;
      max-width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      min-height: 100%;
    }
  }
}
</style>
