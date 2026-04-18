using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
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
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
namespace berpartner_admin
{
    /// <summary>
    /// Interaction logic for Home.xaml
    /// </summary>
    public partial class Home : Page
    {
        public Home()
        {
            InitializeComponent();
        }


        public class User
        {

            public int id { get; set; }
            public string nev { get; set; }
            public string telefonszam { get; set; }
            public string email { get; set; }
            public int berelt_eszkozok_szama { get; set; }
            public string jogosultsag { get; set; }
            public string iranyitoszam { get; set; }
            public string varos { get; set; }
            public string utca { get; set; }
            public string haz_szam { get; set; }



        }

        private static readonly HttpClient client = new HttpClient();

        private async void Page_Loaded(object sender, RoutedEventArgs e)
        {


            try
            {

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                HttpResponseMessage respons = await client.GetAsync("http://localhost:3000/user/getAll");

                if (respons.IsSuccessStatusCode)
                {

                    var result = await respons.Content.ReadFromJsonAsync<List<User>>();




                    UserDataGrid.ItemsSource = result;









                }
                else
                {

                    if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {

                        MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                        MainWindow main = new MainWindow();
                        main.Show();
                        HomeWindow home = new HomeWindow();
                        home.Close();



                    }
                    else
                    {

                        MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                    }



                }

            }
            catch (HttpRequestException)
            {
                MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

        }

        private async void Delete_Click(object sender, RoutedEventArgs e)
        {

            Button btn = sender as Button;

            User user = btn.CommandParameter as User;

            if (user != null)
            {

                int id = user.id;

                if (MessageBox.Show($"Biztosan törli a felhasználót?\n\t{user.nev}", "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes)
                {




                    try
                    {

                        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                        HttpResponseMessage respons = await client.DeleteAsync($"http://localhost:3000/user/admin/delete/{id}");

                        if (respons.IsSuccessStatusCode)
                        {

                            Page_Loaded(null, null);
                            MessageBox.Show("Felhasználó törölve!","Értesítő",MessageBoxButton.OK,MessageBoxImage.Information);



                        }
                        else
                        {

                            if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                            {

                                MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                                MainWindow main = new MainWindow();
                                main.Show();
                                HomeWindow home = new HomeWindow();
                                home.Close();



                            }
                            else
                            {

                                MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                            }



                        }

                    }
                    catch (HttpRequestException)
                    {
                        MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                    catch (Exception ex)
                    {

                        MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }

        }
    }
}
