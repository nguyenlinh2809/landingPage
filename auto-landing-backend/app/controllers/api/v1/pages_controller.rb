module Api
  module V1
    class PagesController < ApplicationController
      before_action :set_pages, :only => [:update, :destroy, :show]

      def index
        json_response(Page.all)
      end

      def show
        json_response(@page)
      end

      def create
        @page = Page.new(page_params)
        if @page.save
          json_response(@page)
        else
          json_response(@page.errors, :unprocessable_entity)
        end
      end

      def update
        if @page.update(page_params)
          json_response(@page)
        else
          json_response(@page.errors, :unprocessable_entity)
        end
      end

      def destroy
        if @page.destroy
          json_response('', :ok)
        else
          json_response(@page.errors, :unprocessable_entity)
        end
      end

      private

      def set_pages
        @page = Page.find(params[:id])
      end

      def page_params
        params.permit(:content_json, :content_html, :status, :image_url, :name)
      end
    end
  end
end

