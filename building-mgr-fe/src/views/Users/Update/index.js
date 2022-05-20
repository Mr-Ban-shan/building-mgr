 import { defineComponent, reactive, watch } from 'vue';
 import { user } from '@/service';
 import { message } from 'ant-design-vue';
 import { result, clone } from '@/helpers/utils';
import store from '@/store';

 export default defineComponent({
    props: {
        show: Boolean,
        user: Object,
    },
   setup(props , context  ) {
       const editForm = reactive({
         phone: '',
       });

     const close = () => {
        context.emit('update:show', false);
    };

    watch(() => props.user, (current) => {
      
      Object.assign(editForm, current);
      /* editForm.publishDate = moment(Number(editForm.publishDate)); */
    });

    const submit = async () => {
      const res = await user.update({
        phone: editForm.phone,
        id: props.user._id
      });

      console.log('res = ', res)

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
       store: store.state,
     };
   },
 });
