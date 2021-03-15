class ApplicationController < ActionController::API
  include ExceptionHandler
  include Response
  before_action :authenticate_user, except: ['login']

  private
  def authenticate_user
    @user ||= User.find_by(user_name: decoded_auth_token[:user_name]) if decoded_auth_token
  rescue ActiveRecord::RecordNotFound => e
    raise(
        ExceptionHandler::InvalidToken,
        ("#{Message.invalid_token} #{e.message}")
    )
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    if request.headers['Authorization'].present?
      return request.headers['Authorization'].split(' ').last
    end
    raise(ExceptionHandler::MissingToken, Message.missing_token)
  end
end
