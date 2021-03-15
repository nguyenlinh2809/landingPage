module Api
  module V1
    class LandingPagesController < ApplicationController
      before_action :set_landing_pages, :only => [:update, :destroy, :show]
      before_action :set_category, :only => [:index]

      def index
        json_response(@category.landing_pages)
      end

      def show
        json_response(@landing_page)
      end

      def create
        @landing_page = LandingPage.new(landing_pages_params)

        if @landing_page.save
          json_response(@landing_page, :created)
        else
          json_response(@landing_page.errors, :unprocessable_entity)
        end
      end

      def update
        if @landing_page.update(landing_pages_params)
          json_response(@landing_page)
        else
          json_response(@landing_page.errors, :unprocessable_entity)
        end
      end

      def destroy
        if @landing_page.destroy
          json_response('', :ok)
        else
          json_response(@landing_page.errors, :unprocessable_entity)
        end
      end

      def landing_pages_params
        params.permit(:content_json, :content_html, :status, :category_id, :image_url, :name)
      end

      def set_landing_pages
        @landing_page = LandingPage.find(params[:id])
      end

      def set_category
        @category = Category.find(params[:category_id])
      end
    end
  end
end

