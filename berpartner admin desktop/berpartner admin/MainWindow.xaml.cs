using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Net.Http;          
using System.Text.Json;     
using System.Threading.Tasks; 

namespace berpartner_admin
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public class Login {
        
            public string email { get; set; }
            public string jelszo { get; set; }
        
        }


        private async void Button_Click(object sender, RoutedEventArgs e)
        {

            Login loginData = new Login();
            loginData.email = emailInput.Text;
            loginData.jelszo = passwordInput.Password;


            using (HttpClient client = new HttpClient()) {

                try
                {
                    string json = JsonSerializer.Serialize(loginData);
                    StringContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage respons = await client.PostAsync("http://localhost:3000/auth/login", content);

                    if (respons.IsSuccessStatusCode)
                    {

                        string responsContent = await respons.Content.ReadAsStringAsync();


                        using (JsonDocument doc = JsonDocument.Parse(responsContent)) {
                        
                            JsonElement root = doc.RootElement;

                            App.Token = root.GetProperty("token").GetString();

                        }

                            

                            HomeWindow home = new HomeWindow();
                        home.Show();
                        this.Close();

                    }
                    else
                    {

                        MessageBox.Show("Hibás felhasználónév vagy jeszó!", "Hibás Adatok", MessageBoxButton.OK, MessageBoxImage.Error);

                    }

                }
                catch (Exception ex) {

                    MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}