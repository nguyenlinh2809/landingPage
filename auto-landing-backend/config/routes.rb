Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #get '/login', controller: 'users#login'
  namespace 'api' do
    namespace 'v1' do
      root 'user#login'
      post '/login', to: 'users#login'

      resources :categories do
        resources :landing_pages
      end
      resources :pages
    end
  end
end
