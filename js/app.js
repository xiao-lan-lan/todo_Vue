//1.遍历数组,创建li
//2.根据done真假，决定li的样式和复选框的选中状态
//3.template 包裹，有数据显示，没数据不显示


//12.进入获取焦点
Vue.directive('focus',{
    inserted:function(el) {
        el.focus();
    }
} )


new Vue({
    el: '#app',
    data: {
        msg: '',
        list: [
            { id: 1, title: '吃饭', done: true },
            { id: 2, title: '睡觉', done: false },
            { id: 3, title: '打豆豆', done: true },
            { id: 4, title: '敲代码', done: false }
        ],
        curentobj:null,
    },
    computed: {


         //6.删除全部已完成
        //（1）显示隐藏：只要有一个已完成就显示，没有已完成不显示，v-show ；计算属性，some 遍历 done 为 true的；
        isshow:function() {
            return this.list.some((item)=>{
                return item.done
            })
        },


        // 7.未完成数量，计算属性，返回 筛选 done 为 false 的新数组长度
        activenum:function() {
            const activearr= this.list.filter((item)=>{
                return item.done==false
            });
            return activearr.length
        },


        // 9.反选，计算属性，every 遍历，每一项都为true返回true
        flag:function() {
            return this.list.every((item)=>{
                return item.done==true
            })
        }

    },
    methods: {

        // 4.添加内容，键盘回车事件，拿 value 用 v-model，非空
        onAdd() {
            //(1).拿输入的内容，即value值
            const msginput = this.msg.trim();

            //(2).非空判断
            if (!msginput.length) {
                return
            }

            //(3).添加到数组
            this.list.unshift({
                id: Math.random(),
                title: msginput,
                done: false
            })

            //(4).清空文本框
            this.msg = '';
        },


        //5.删除单个元素，点击事件，传索引数组移除；
        delone(index) {
            this.list.splice(index,1);
        },


        //6.删除全部已完成
        //（2）删除：点击事件，遍历删除已完成的，for 循环，手动 i--，否则删不干净
        delAll() {
            for (let i = 0; i < this.list.length; i++) {
               if (this.list[i].done) {
                   this.list.splice(i,1);
                   i--;
                }
            }
        },


        //8.全选，change 事件，拿全选复选框的原生checked属性，给子复选框，即数组的 done
        checkAll(e){
            console.log(e.target.checked);
            this.list.forEach((item)=>{
                item.done=e.target.checked;
            })
        },


        //10.双击获得编辑状态，li 的editing 的样式是否显示，取决于双击的任务项和遍历的任务项是否相等；所以双击时把当前的任务项存起来，去跟遍历的任务项对比；
        changeinput(obj) {
            this.curentobj=obj;
        },


        //11.回车保存编辑状态；修改数据，把 dom 的 value 给双击任务项的 title;去除编辑状态，双击任务项恢复，把curentobj恢复null，即不相等，editing 样式不作用 ；esc取消编辑，双击任务项恢复 null 
        onSave(e) {
            this.curentobj.title =e.target.value;
            this.curentobj=null
        }
    }
})