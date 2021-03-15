module Api
  module V1
    class CategoriesController < ApplicationController
      before_action :set_category, only: [:show, :update, :destroy]

      def index
        json_response(Category.all)
      end

      def show
        json_response(@category)
      end

      def update
        if @category.update(category_params)
          json_response(@category)
        else
          json_response(@category.errors, :unprocessable_entity)
        end
      end

      def create
        @category = Category.new(category_params)
        @category.status = 1 if !@category.status
        if @category.save
          json_response(@category, :created)
        else
          json_response(@category.errors, :unprocessable_entity)
        end
      end

      def destroy
        if @category.destroy
          json_response('', :ok)
        else
          json_response(@category.errors, :unprocessable_entity)
        end
      end

      private

      def category_params
        params.require(:category).permit(:name, :code, :status)
      end

      def set_category
        @category = Category.find(params[:id])
      end
    end
  end
end

