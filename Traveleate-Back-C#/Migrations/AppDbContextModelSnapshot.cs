﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Traveleate_Back_C_.Data;

#nullable disable

namespace Traveleate_Back_C_.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Traveleate_Back_C_.Models.Butaca", b =>
                {
                    b.Property<int>("IdButaca")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdButaca"));

                    b.Property<int>("IdCategoriaButaca")
                        .HasColumnType("int");

                    b.HasKey("IdButaca");

                    b.ToTable("Butacas");
                });

            modelBuilder.Entity("Traveleate_Back_C_.Models.CategoriaButaca", b =>
                {
                    b.Property<int>("IdCategoriaButaca")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdCategoriaButaca"));

                    b.Property<string>("Categoria")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Precio")
                        .HasColumnType("int");

                    b.HasKey("IdCategoriaButaca");

                    b.ToTable("CategoriaButacas");
                });

            modelBuilder.Entity("Traveleate_Back_C_.Models.Colectivo", b =>
                {
                    b.Property<int>("IdColectivo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdColectivo"));

                    b.Property<string>("Matricula")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalButacas")
                        .HasColumnType("int");

                    b.HasKey("IdColectivo");

                    b.ToTable("Colectivos");
                });

            modelBuilder.Entity("Traveleate_Back_C_.Models.Localidad", b =>
                {
                    b.Property<int>("IdLocalidad")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdLocalidad"));

                    b.Property<string>("NombreLocalidad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdLocalidad");

                    b.ToTable("Localidades");
                });

            modelBuilder.Entity("Traveleate_Back_C_.Models.Reserva", b =>
                {
                    b.Property<int>("IdReserva")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdReserva"));

                    b.Property<string>("ApellidoCliente")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DNICliente")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdButaca")
                        .HasColumnType("int");

                    b.Property<int>("IdViaje")
                        .HasColumnType("int");

                    b.Property<bool>("MayorEdad")
                        .HasColumnType("bit");

                    b.Property<string>("NombreCliente")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PrecioTotal")
                        .HasColumnType("int");

                    b.HasKey("IdReserva");

                    b.ToTable("Reservas");
                });

            modelBuilder.Entity("Traveleate_Back_C_.Models.Viaje", b =>
                {
                    b.Property<int>("IdViaje")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdViaje"));

                    b.Property<string>("ButacaReservadas")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdColectivo")
                        .HasColumnType("int");

                    b.Property<int>("IdLocalidadDestino")
                        .HasColumnType("int");

                    b.Property<int>("IdLocalidadOrigen")
                        .HasColumnType("int");

                    b.Property<int>("Precio")
                        .HasColumnType("int");

                    b.HasKey("IdViaje");

                    b.ToTable("Viajes");
                });
#pragma warning restore 612, 618
        }
    }
}
