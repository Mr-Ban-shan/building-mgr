 import { defineComponent, reactive, watch } from 'vue';
 import { building } from '@/service';
 import { message } from 'ant-design-vue';
 import { result, clone } from '@/helpers/utils';
 import moment from 'moment';
// import store from '@/store';

 export default defineComponent({
    props: {
        show: Boolean,
        building: Object,
    },
   setup(props , context  ) {
       const editForm = reactive({
         name: '',
         price: 0,
         author: '',
         publishDate: 0,
         classify:'',
       });

     const close = () => {
        context.emit('update:show', false);
    };

    watch(() => props.building, (current) => {
      Object.assign(editForm, current);
      editForm.publishDate = moment(Number(editForm.publishDate));
    });

    const submit = async () => {
      const res = await building.update({
        id: props.building._id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        publishDate: editForm.publishDate.valueOf(),
        classify: editForm.classify,
      });

      result(res)
        .success(({ data, msg }) => {
          context.emit('update', data);
          message.success(msg);
          close();
        });
    };

   
     return {
       editForm,
       submit,
       props,
       close,
//       store: store.state,
     };
   },
 });
