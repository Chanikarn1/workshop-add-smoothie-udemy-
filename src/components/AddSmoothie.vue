<template>
    <div class="add-smoothie container">
        <div class="center-align indigo-text">Add New Smoothie Recipe</div>
        <form @submit.prevent="AddSmoothie">
                <div class="field title">
                    <label for="title">
                        Smoothie Title:
                    </label>
                    <input name="title" type="text" v-model="title">
                </div>
                <div v-for="(ingredient,index) in ingredients" :key="index" class="field">
                    <label for="ingredient">
                       Ingredient:
                    </label>
                    <input name="ingredient" type="text" v-model="ingredients[index]">
                     <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
                </div>
                
                <div class="field add-ingredient">
                        <label for="add-ingredient">Ad an ingredient</label>
                        <input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another">
                </div>
                <div class="field center-align">
                    <p v-if="feedback" class="red-text">{{feedback}}</p>
                    <button class="btn pink" >Add Smoothie</button>
                </div>
        </form>
    </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: "Addsmoothie",
    data(){
        return{
            title: null,
            another:null,
            ingredients:[],
            feedback:null,
            slug:null
        }
    },
    methods:{
        AddSmoothie(){
            console.log("เพิ่มส่วนผสม")
            if(this.title){
                this.feedback = null
                //create slug
                this.slug = slugify(this.title,{
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@']/g,
                    lower:true


                })
            console.log(this.slug)

                db.collection('Smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug:this.slug
                })
                .then(() =>{
                    this.$router.push({name:'Index'})
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.feedback = 'You must enter a value to add an inredient'

            }
        },
        deleteIng(ing){
             this.ingredients = this.ingredients.filter(ingredient =>{
              return ingredient != ing //ถ้า true จะอยู่ในอาเรย์ แต่ถ้า false จะถูกเอาออกไป
             })
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another = null
                 this.feedback = null
                console.log(this.ingredients)
            }
            else{
                this.feedback = 'You must enter a value to add an inredient'
            }
        }
    }
}
</script>
<style scoped>
.add-smoothie{
    margin-top:60px;
    padding:20px;
    max-width:500px
}
.add-smoothie h2{
    font-size:2em;
    margin:20px auto;
}
.add-smoothie .field{
    margin:20px auto;
    position: relative;
}
.add-smoothie .delete{
    position: absolute;
    right:0;
    bottom:16px;
    color:#aaa;
    font-size: 1.4em;
    cursor:pointer;

}
</style>