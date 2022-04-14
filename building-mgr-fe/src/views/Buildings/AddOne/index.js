 import { defineComponent, reactive } from 'vue';
 import { building } from '@/service';
 import { message } from 'ant-design-vue';
 import { result, clone } from '@/helpers/utils';
 import store from '@/store';


 const defaultFormData = {
    name: '',
    price: 0,
    author: '',
    publishDate: 0,
    classify:'',
    count: '',
 };

 export default defineComponent({
    props: {
        show: Boolean,
    },
   setup(props , context  ) {
    const addForm = reactive(clone(defaultFormData));
    
    if (store.state.buildingClassify.length) {
      addForm.classify = store.state.buildingClassify[0]._id; 
    }

    const close = () => {
      context.emit('update:show', false);
    };

    const submit = async () => {
       const form = clone(addForm);
       form.publishDate = addForm.publishDate.valueOf();
       const res = await building.add(form);

       result(res)
         .success((d, { data }) => {
          Object.assign(addForm, defaultFormData);
          message.success(data.msg);

           context.emit('getList');

          close(); 
        });
     };


     return {
       addForm,
       submit,
       props,
       close,
       store: store.state,
     };
   },
 });
