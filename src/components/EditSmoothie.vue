<template>
    <div v-if ="smoothie" class="edit-smoothie container">
        <h2>Edit smoothie {{smoothie.title}} smoothie</h2>
         <form @submit.prevent="EditSmoothie">
                <div class="field title">
                    <label for="title">
                        Smoothie Title:
                    </label>
                    <input name="title" type="text" v-model="smoothie.title">
                </div>
                <div v-for="(ingredient,index) in smoothie.ingredients" :key="index" class="field">
                    <label for="ingredient">
                       Ingredient:
                    </label>
                    <input name="ingredient" type="text" v-model="smoothie.ingredients[index]">
                     <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
                </div>
                
                <div class="field add-ingredient">
                        <label for="add-ingredient">Ad an ingredient</label>
                        <input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another">
                </div>
                <div class="field center-align">
                    <p v-if="feedback" class="red-text">{{feedback}}</p>
                    <button class="btn pink">Update Smoothie</button>
                </div>
        </form>
    </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name:'EditSmoothie',
    data(){
        return{
            smoothie:null,
            another: null,
            feedback:null  
        }
    }, 
   
      methods:{
       EditSmoothie(){
            if(this.smoothie.title){
                this.feedback = null
                //create slug
                this.smoothie.slug = slugify(this.smoothie.title,{
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@']/g,
                    lower:true


                })
            console.log(this.slug)
                //update record เดิม

                db.collection('Smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug:this.smoothie.slug
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
             this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient =>{
              return ingredient != ing //ถ้า true จะอยู่ในอาเรย์ แต่ถ้า false จะถูกเอาออกไป
             })
        },
        addIng(){
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                 this.feedback = null
                console.log(this.smoothie.ingredients)
            }
            else{
                this.feedback = 'You must enter a value to add an inredient'
            }
        }
    },
    created(){
        //ดึงข้อมูลของตาราง Smoothies ที่doc มี slug ชื่อที่ส่งผ่านเข้ามา
        let ref = db.collection('Smoothies').where('slug','==',this.$route.params.smoothie_slug)
        ref.get().then(snapshot =>{
                console.log("dfdxf")
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
                console.log(doc.data())
            })
        }).catch(err =>{
            console.log(err)
        })
    }
}
</script>
<style>
.edit-smoothie{
    margin-top:60px;
    padding:20px;
    max-width:500px
}
.edit-smoothie h2{
    font-size:2em;
    margin:20px auto;
}
.edit-smoothie .field{
    margin:20px auto;
    position: relative;
}
.edit-smoothie .delete{
    position: absolute;
    right:0;
    bottom:16px;
    color:#aaa;
    font-size: 1.4em;
    cursor:pointer;

}
</style>