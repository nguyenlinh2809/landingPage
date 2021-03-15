module Api
  module V1
      class UsersController < ApplicationController
        def login
          userName = user_params[:user_name]
          password = user_params[:password]
          @user = User.find_by(user_name: userName)
          #byebug
          if @user && @user.authenticate(password)
            token = JsonWebToken.encode(user_name: @user.user_name)
            render json: { user_name: userName, token: token, status: :success }
          else
            render json: { status: :not_found }
          end
        end

        def get
          render json: User.find_by(user_name: 'admin')
        end

        private
        def user_params
          params.permit(:user_name, :password)
        end
      end
  end
end

