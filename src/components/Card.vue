<template>
	<div class="col m6">
        <div class="card horizontal">
          <div class="card-image" @click="showReciter(reciter.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div class="center-align">
                <h6>{{ reciter.name }}</h6>
              </div>
              <div class="details">
                <span>{{ reciter.count }}</span>
                <span>سورة</span>
              </div>
              <div class="details">
                <span>رواية:</span>
                <span>{{ reciter.rewaya }} </span>
              </div>
            </div>
            <div class="card-action">
				<span @click="deleteReciter(reciter)" class="delete_reciter"> <i class="material-icons">delete</i></span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
	export default {
		name: 'Card',
		props: ['reciter'],
			methods: {
			showReciter(id) {
				this.$router.push('/reciter?id=' + id);
			},
			deleteReciter(reciter) {
				this.$emit('deleteFavRec', reciter);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../style/_card.scss';
	.delete_reciter {
		cursor: pointer;
		color: #ee6e73;
	}
</style>