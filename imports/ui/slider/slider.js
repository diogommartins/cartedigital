/**
 * Created by diogomartins on 4/18/16.
 */
import { Template } from 'meteor/templating';

import './slider.html';

//https://source.unsplash.com/category/food/1920x1000
Template.slider.helpers({
    sliderImages: function(){
        return [
            {
                src: "https://images.unsplash.com/photo-1428660386617-8d277e7deaf2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1920&h=1000&fit=crop&s=3a6f843fba599ad58bc1b4924d3bfbf8",
                title: "Imagem fake da porra 1"
            },
            {
                src: "https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1920&h=1000&fit=crop&s=52baa9d3f8db6134b68ccadb6aa3ca25",
                title: "Imagem fake da porra 2"
            },
            {
                src: "https://images.unsplash.com/photo-1449793079811-bc4bcd990abf?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1920&h=1000&fit=crop&s=74c23e22946c28eb50a8b8d2906bc618",
                title: "Imagem fake da porra 3"
            }
        ]
    },
    teste: function(){
        return "asdasgadbs";
    }
});